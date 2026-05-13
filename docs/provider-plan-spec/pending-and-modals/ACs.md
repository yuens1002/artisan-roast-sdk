# PENDING state + discriminated `actionModals[]` + MCP version fix: ACs

**Branch:** `feat/pending-and-modals`
**Version target:** v0.5.0

---

## Functional Acceptance Criteria — `PendingState`

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-1 | `PendingState` interface added | Code review: `src/plans/index.ts` | `PendingState` = `{ status: "PENDING"; statusInfo?: StatusInfo; actions: PlanAction[] }`; JSDoc explains provisioning + "not a frozen-modal wait" | | | |
| AC-FN-2 | `PendingState` in `PlanState` union | Code review: `src/plans/index.ts` | `PlanState` includes `PendingState` | | | |
| AC-FN-3 | No `pools` on `PendingState` | Code review: `src/plans/index.ts` | `PendingState` has no `pools` field | | | |

---

## Functional Acceptance Criteria — `actionModals[]` discriminated union

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-4 | `ConfirmActionConfig` removed | Code review: `src/` | No `ConfirmActionConfig` interface anywhere in `src/` | | | |
| AC-FN-5 | `FeedbackFormModal` added | Code review: `src/plans/index.ts` | Old `ConfirmActionConfig` shape + `type: "feedbackForm"` discriminator; JSDoc notes "Was `ConfirmActionConfig` pre-v0.5.0" | | | |
| AC-FN-6 | `PaymentConfirmModal` added | Code review: `src/plans/index.ts` | `{ type: "paymentConfirm"; slug; heading; description?; confirmLabel; processingMessages: string[] }`; JSDoc explains confirm → spinner → flips to PENDING | | | |
| AC-FN-7 | `ActionModal` union added | Code review: `src/plans/index.ts` | `ActionModal = FeedbackFormModal \| PaymentConfirmModal` | | | |
| AC-FN-8 | `Plan.actionModals` retyped | Code review: `src/plans/index.ts` | `actionModals?: ActionModal[]` | | | |

---

## Functional Acceptance Criteria — MCP version

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-9 | No hardcoded `"0.2.0"` | Code review: `src/mcp/server.ts` | No version string literal; `SDK_VERSION` read from `package.json` via `readFileSync` + `JSON.parse`, module-relative | | | |
| AC-FN-10 | Version used in all three places | Code review: `src/mcp/server.ts` | `McpServer` constructor `version`, `/health` response, `/` response all use `SDK_VERSION` | | | |
| AC-FN-11 | No port bound on import | Code review: `src/mcp/server.ts` | `listen()` guarded by `require.main === module`; `createMcpServer` / `createHttpServer` / `SDK_VERSION` exported | | | |

---

## Functional Acceptance Criteria — Zod schemas

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-12 | `PendingStateSchema` added | Code review: `src/plans/validation.ts` | `.strict()` object: `status` literal + `statusInfo?` + `actions` | | | |
| AC-FN-13 | `PendingStateSchema` in `PlanStateSchema` | Code review: `src/plans/validation.ts` | discriminated union includes the PENDING branch | | | |
| AC-FN-14 | `ConfirmActionConfigSchema` removed | Code review: `src/plans/validation.ts` | No `ConfirmActionConfigSchema` | | | |
| AC-FN-15 | `FeedbackFormModalSchema` + `PaymentConfirmModalSchema` + `ActionModalSchema` added | Code review: `src/plans/validation.ts` | `ActionModalSchema = z.discriminatedUnion("type", […])`; `PlanSchema.actionModals` uses it | | | |
| AC-FN-16 | `modalSlug` resolution covers pool CTAs | Code review: `src/plans/validation.ts` | `HydratedPlanSchema` superRefine checks `state.actions[].modalSlug` **and** `state.pools[].cta.modalSlug` | | | |

---

## Functional Acceptance Criteria — Scaffolds

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-17 | `PENDING` scaffold added | Code review: `src/plans/scaffolds.ts` | `SCENARIOS.PENDING.state.status === "PENDING"`; has `statusInfo`, a `check-status` action with an `endpoint`, and a `paymentConfirm` `actionModals` entry | | | |
| AC-FN-18 | Existing modal configs typed | Code review: `src/plans/scaffolds.ts` | every `actionModals` entry in every scenario has a `type` (all currently `"feedbackForm"`) | | | |
| AC-FN-19 | Scaffold import updated | Code review: `src/plans/scaffolds.ts` | imports `ActionModal` (not `ConfirmActionConfig`) | | | |

---

## Validation Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-VAL-1 | PENDING payload accepted | `validate_plan_payload` / `HydratedPlanSchema` on a PENDING payload | `{ valid: true }` | | | |
| AC-VAL-2 | PENDING + `pools` rejected | `HydratedPlanSchema` on a PENDING payload that includes `pools` | not valid | | | |
| AC-VAL-3 | Both modal types accepted | `HydratedPlanSchema` on a payload with a `feedbackForm` and a `paymentConfirm` entry | `{ valid: true }` | | | |
| AC-VAL-4 | Unknown modal type rejected | `ActionModalSchema` / `PlanSchema` on an entry with `type: "mysteryModal"` | not valid | | | |
| AC-VAL-5 | Empty `processingMessages` rejected | `ActionModalSchema` on a `paymentConfirm` with `processingMessages: []` | not valid | | | |
| AC-VAL-6 | Dangling `modalSlug` rejected | `HydratedPlanSchema` where an action's `modalSlug` matches no `actionModals` entry | not valid | | | |
| AC-VAL-7 | Resolving `modalSlug` accepted | `HydratedPlanSchema` where the `modalSlug` resolves | `{ valid: true }` | | | |
| AC-VAL-8 | All scaffolds valid | `HydratedPlanSchema` on every `SCENARIOS` entry | `{ valid: true }` for all — zero regressions | | | |

---

## MCP Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-MCP-1 | `serverInfo.version` === `package.json` version | In-memory MCP handshake: `client.getServerVersion().version` | equals `require("./package.json").version` (`0.5.0`) | | | |
| AC-MCP-2 | `/health` reports the package version | `curl https://sdk.artisanroast.app/health` after deploy | `{"status":"ok","version":"0.5.0"}` | | | |
| AC-MCP-3 | `scaffold_plan_state` lists `PENDING` | MCP `scaffold_plan_state` tool description / `SCENARIO_KEYS` | includes `PENDING` | | | |

---

## Test Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-TST-1 | `test/` + `npm test` | `package.json` scripts | `"test": "node --test"` present | | | |
| AC-TST-2 | Suite green | `npm run build && npm test` | all tests pass, 0 fail | | | |

---

## Build Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-BLD-1 | TypeScript clean | `npm run typecheck` | 0 errors | | | |
| AC-BLD-2 | `dist/` updated | `npm run build` | `dist/plans/index.d.ts` exports `PendingState`, `FeedbackFormModal`, `PaymentConfirmModal`, `ActionModal`; no `ConfirmActionConfig`; `dist/mcp/server.d.ts` exports `SDK_VERSION` | | | |
| AC-BLD-3 | Version bumped | `package.json` | `"version": "0.5.0"` | | | |

---

## Docs Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-DOC-1 | Spec updated | Review `spec/provider-plan.spec.md` | `**Version:** 0.5.0`; `PENDING` section present; `actionModals` documented as discriminated union; `UsagePool` section (no stale `ProgressBar`) | | | |
| AC-DOC-2 | Changelog | Review `CHANGELOG.md` | `[0.5.0]` entry with Breaking/Added/Fixed; migration guidance for `ConfirmActionConfig` → `FeedbackFormModal` | | | |
| AC-DOC-3 | Feature doc home | `docs/provider-plan-spec/pending-and-modals/{plan,ACs}.md` exist | both present | | | |
