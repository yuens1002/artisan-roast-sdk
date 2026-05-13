# PENDING state + discriminated `actionModals[]` + MCP version fix

**Branch:** `feat/pending-and-modals`
**Version target:** v0.5.0 (minor bump — breaking rename)
**Prerequisite:** v0.4.1 (`fix/validation-iconafter`)
**Downstream consumers:** `ecomm-ai-app` — Session 2 feat branch (plan card render + `ConfirmActionDialog` split); `artisan-roast-platform` — resolver emits `PENDING` during provisioning

---

## What changed and why

Three changes ship together — one PR, one minor bump.

### 1. `PendingState` — new plan-card state

When a customer completes a paid conversion (trial → subscription, or a direct subscribe), the store isn't live instantly — provisioning can take minutes. There was no payload shape for "paid, not yet live". Adding `PENDING` lets the resolver report it: the store renders a NONE-shaped card (name, `statusInfo` copy, a "Check Status" CTA, a spinner during the poll), the resolver keeps returning `PENDING` while provisioning, then flips to `ACTIVE`.

This is **not** a frozen-modal wait — the customer can navigate away and come back. `PENDING` is just another `PlanState` variant the resolver computes.

```typescript
export interface PendingState {
  status: "PENDING";
  statusInfo?: StatusInfo;   // "Setting up your store — a few minutes."
  actions: PlanAction[];     // typically one endpoint-backed "Check Status"
}
```

Has `actions[]` (Check Status is an action). **No `pools[]`** — provisioning has no usage to display yet. The zod schema for `PENDING` is `.strict()`, so a stray `pools` (or `badge`) is a validation error rather than silently stripped.

### 2. `actionModals[]` → discriminated union on `type`

`ConfirmActionConfig` only modelled one kind of modal — the "tell us why" cancel/downgrade dialog. The payment-confirmation popup (confirm the charge → non-dismissable spinner while Stripe processes) is a structurally different modal. Rather than a second optional field, `actionModals[]` becomes a discriminated union:

```typescript
export interface FeedbackFormModal {
  type: "feedbackForm";
  slug: string;
  heading: string;
  description: string;
  reasonsLabel: string;
  reasons: Array<{ value: string; label: string }>;
  keepLabel: string;
  confirmLabel: string;
  confirmIcon?: string;
  other?: { label: string; placeholder: string; maxLength: number };
}

export interface PaymentConfirmModal {
  type: "paymentConfirm";
  slug: string;
  heading: string;            // "Completing your subscription"
  description?: string;       // optional pre-confirm copy / price line
  confirmLabel: string;       // "Confirm and pay"
  processingMessages: string[]; // status copy under the spinner; cycled if >1
}

export type ActionModal = FeedbackFormModal | PaymentConfirmModal;
```

`Plan.actionModals?: ConfirmActionConfig[]` → `Plan.actionModals?: ActionModal[]`. `PlanAction.modalSlug` still references an entry by slug; the store branches on `modal.type` to render the right shape.

**This is a breaking rename** — `ConfirmActionConfig` is gone. Existing modal configs (`cancel-trial`, `cancel-stripe`, `cancel-subscription`) become `type: "feedbackForm"`. The rename is the forcing function downstream: TypeScript flags every `ConfirmActionConfig` reference and the non-exhaustive `case` switch on the new state.

### 3. MCP version fix

`src/mcp/server.ts` hardcoded `version: "0.2.0"` in the `McpServer` constructor and the `/health` + `/` responses — three lifetimes behind. It now reads `package.json` at runtime, module-relative:

```typescript
export const SDK_VERSION: string = (
  JSON.parse(readFileSync(join(__dirname, "..", "..", "package.json"), "utf8")) as {
    version: string;
  }
).version;
```

CJS/ESM-agnostic, no `tsconfig` change, no JSON-import-assertion sensitivity — matches the current CJS build (`module: NodeNext`, no top-level `"type"`, no `resolveJsonModule`). `httpServer.listen()` is now guarded by `require.main === module` so importing the module (e.g. from a test) doesn't bind a port.

---

## Type changes (`src/plans/index.ts`)

| Change | Detail |
|--------|--------|
| Add `PendingState` | `{ status: "PENDING"; statusInfo?: StatusInfo; actions: PlanAction[] }` |
| Add `PendingState` to `PlanState` union | `PlanState = … \| PendingState` |
| Remove `ConfirmActionConfig` | Replaced by `FeedbackFormModal` |
| Add `FeedbackFormModal` | `ConfirmActionConfig` shape + `type: "feedbackForm"` |
| Add `PaymentConfirmModal` | `{ type: "paymentConfirm"; slug; heading; description?; confirmLabel; processingMessages: string[] }` |
| Add `ActionModal` union | `FeedbackFormModal \| PaymentConfirmModal` |
| `Plan.actionModals` retyped | `ConfirmActionConfig[]` → `ActionModal[]` |

---

## Zod schema changes (`src/plans/validation.ts`)

| Change | Detail |
|--------|--------|
| Add `PendingStateSchema` | `.strict()` — `status` literal + `statusInfo?` + `actions`; rejects `pools` (or any extra key) |
| Add `PendingStateSchema` to `PlanStateSchema` | discriminated union gains `"PENDING"` |
| Remove `ConfirmActionConfigSchema` | Replaced by `FeedbackFormModalSchema` |
| Add `FeedbackFormModalSchema` | old shape + `type: z.literal("feedbackForm")`; `reasons` is `.min(1)` |
| Add `PaymentConfirmModalSchema` | `type` literal + `heading` + `confirmLabel` + `processingMessages` (`.min(1)`); `description` optional |
| Add `ActionModalSchema` | `z.discriminatedUnion("type", [FeedbackFormModalSchema, PaymentConfirmModalSchema])` |
| `PlanSchema.actionModals` retyped | `z.array(ActionModalSchema).optional()` |
| `HydratedPlanSchema` superRefine | `modalSlug` resolution now also covers `pool.cta.modalSlug`, not just `state.actions[].modalSlug` |

---

## Scaffold changes (`src/plans/scaffolds.ts`)

| Scenario | Change |
|----------|--------|
| `PENDING` (new) | House Blend in `PENDING` state — `statusInfo` provisioning copy, `check-status` primary action, a `convert-payment` `paymentConfirm` modal config |
| `TRIAL_ACTIVE_NO_CARD`, `TRIAL_ACTIVE_CARD_ADDED` | `houseBlendTrialModals` entries gain `type: "feedbackForm"` |
| `PRIORITY_SUPPORT_ACTIVE` | `cancel-subscription` modal gains `type: "feedbackForm"` |

---

## MCP server changes

| File | Change |
|------|--------|
| `src/mcp/server.ts` | `SDK_VERSION` read from `package.json`; `createMcpServer` / `createHttpServer` exported; `listen()` guarded by `require.main === module` |
| `src/mcp/tools/plans.ts` | `validate_plan_payload` description mentions `PENDING` + the discriminated `actionModals` |
| `src/mcp/resources/plans.ts` | consumer guide: `PENDING` dispatch case, `UsagePool` section (replaces stale `ProgressBar` section), `Action modals` section rewritten for the discriminated union; `plans://integration/producer` path corrected (`docs/provider-spec.md` → `spec/provider-plan.spec.md`, which is where the spec actually lives) |

---

## Tests (`test/`, `node:test`)

New `test/` directory + `npm test` script (`node --test`). Tests run against `dist/` — `npm run build` first.

- `test/validation.test.cjs` — `HydratedPlanSchema` accepts a `PENDING` payload; `PENDING` errors when `pools` present; `actionModals` accepts each modal type and both together; rejects an unknown modal `type`; `paymentConfirm` rejects an empty `processingMessages`; a dangling `modalSlug` is rejected, a resolving one is accepted; every `SCENARIOS` entry validates; `PENDING` scaffold present and in `PENDING` state.
- `test/server.test.cjs` — `SDK_VERSION === package.json.version`; over an in-memory MCP transport, `client.getServerVersion().version === package.json.version`; the server exposes the expected tool set.

---

## Docs

- `spec/provider-plan.spec.md` — `**Version:** 0.5.0`; new `PENDING` state-variant section; `UsagePool` section replaces the stale `ProgressBar` section; `TRIAL`/`EXPIRED` examples use `pools`; `actionModals` section rewritten as a discriminated union with both modal kinds; `check-status` added to the action slugs table.
- `CHANGELOG.md` — `[0.5.0]` entry (breaking: `ConfirmActionConfig` → `FeedbackFormModal`; added: `PendingState`, `PaymentConfirmModal`, `ActionModal`; fixed: MCP version-from-package); `[0.4.1]` backfilled.
- `README.md` — quick-start example corrected (`status: "NONE"`, `benefits: { activeItems: [...] }`); spec link fixed.

---

## Versioning — v0.5.0 (minor, pre-1.0 breaking)

- **Breaking:** `ConfirmActionConfig` removed → `FeedbackFormModal` (`type: "feedbackForm"`); `Plan.actionModals` element type changed.
- **Added:** `PendingState` (new `PlanState` variant), `PaymentConfirmModal`, `ActionModal` union.
- **Fixed:** MCP server reports the real package version.

**Consumer migration:**
- `ecomm-ai-app` (Session 2 feat branch) — `case "PENDING":` renders a `PendingCard`, not `null`; `ConfirmActionDialog` splits on `modal.type` (`feedbackForm` → existing reasons dialog, `paymentConfirm` → confirm-then-spinner); dev scenario `dev-pending`; bump SDK ref → `#v0.5.0` (TypeScript flags the non-exhaustive switch + every `ConfirmActionConfig` reference — those are the forcing functions).
- `artisan-roast-platform` — resolver emits `PENDING` while a store is provisioning; grep `ConfirmActionConfig`; run `npm run precheck`.

---

## Release checklist (follow `.skills/release.md`)

- [x] Types updated (`src/plans/index.ts`)
- [x] Zod schemas updated (`src/plans/validation.ts`)
- [x] Scaffolds updated (`src/plans/scaffolds.ts`)
- [x] MCP server reads version from `package.json` (`src/mcp/server.ts`)
- [x] MCP tool/resource copy updated (`src/mcp/tools/plans.ts`, `src/mcp/resources/plans.ts`)
- [x] Tests added (`test/`), `npm test` green
- [x] `spec/provider-plan.spec.md` updated + version bumped to `0.5.0`
- [x] `CHANGELOG.md` updated with migration guidance
- [x] `package.json` bumped to `0.5.0`
- [x] `npm run typecheck` clean
- [x] `npm run build` clean
- [ ] Separate bump commit: `chore: bump to v0.5.0`
- [ ] PR opened, Copilot reviewed, threads resolved
- [ ] Merged + tagged `v0.5.0` on `master`
- [ ] Railway health check: `curl https://sdk.artisanroast.app/health` → `{"status":"ok","version":"0.5.0"}`
- [ ] Consumer repo PRs (platform + store)
