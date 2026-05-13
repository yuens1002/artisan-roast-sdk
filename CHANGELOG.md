# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.1] - 2026-05-13

### Fixed

- `UsagePool.countLabel` is now optional in the TypeScript interface (`countLabel?: string`), matching `UsagePoolSchema` (already `.optional()`) and the v0.4.0 changelog declaration. Previously the type required the field while the schema accepted its absence. Loosening — non-breaking.
- `spec/provider-plan.spec.md` examples updated to satisfy the v0.4.1 validation rule (`url` + non-`ghost` variant requires `iconAfter`). The `NONE.subscribe`, `CANCELLED.reactivate`, and `add-billing` disabled-snippet examples gain `iconAfter: "external-link"` (and `variant: "primary"` where missing). The examples now round-trip through `validate_plan_payload`.

### Added

- `test/validation.test.cjs` — assertion that a `UsagePool` without `countLabel` validates successfully.

## [0.5.0] - 2026-05-12

### Breaking Changes

- **`ConfirmActionConfig` removed.** `Plan.actionModals` is now an array of `ActionModal` — a discriminated union on `type`. The old `ConfirmActionConfig` shape is now `FeedbackFormModal` with `type: "feedbackForm"` added. Existing modal configs (`cancel-trial`, `cancel-stripe`, `cancel-subscription`) must gain `type: "feedbackForm"`. Consumers that imported `ConfirmActionConfig` import `FeedbackFormModal` (or `ActionModal`) instead, and must branch on `modal.type` when rendering.

### Added

- `PendingState` — new `PlanState` variant (`status: "PENDING"`) for the window between a successful paid conversion and the store going live. NONE-shaped: `statusInfo?` + `actions[]` (typically one endpoint-backed `check-status`), no `pools[]`. The resolver returns `PENDING` while provisioning, then `ACTIVE`. Added to the `PlanState` union; `PendingStateSchema` (`.strict()` — rejects `pools`) added to `PlanStateSchema`.
- `FeedbackFormModal` (`type: "feedbackForm"`) — the reason-capture dialog (was `ConfirmActionConfig`).
- `PaymentConfirmModal` (`type: "paymentConfirm"`) — payment-loop modal: confirm the charge, then a non-dismissable spinner with `processingMessages` while Stripe processes; closes when the charge resolves (the plan then flips to `PENDING`).
- `ActionModal` union (`FeedbackFormModal | PaymentConfirmModal`); `FeedbackFormModalSchema`, `PaymentConfirmModalSchema`, `ActionModalSchema` in `validation.ts`.
- `PENDING` scaffold scenario in `scaffolds.ts` (House Blend provisioning, with a `convert-payment` `paymentConfirm` modal config).
- `test/` directory + `npm test` (`node --test`) — first test suite: validation behaviour for `PENDING`, the discriminated `actionModals`, `modalSlug` resolution, every scaffold; MCP `serverInfo.version` over an in-memory transport.

### Fixed

- MCP server reports the real package version. `src/mcp/server.ts` no longer hardcodes `"0.2.0"` in the `McpServer` constructor or the `/health` + `/` responses — `SDK_VERSION` is read from `package.json` at runtime (module-relative `readFileSync`, CJS/ESM-agnostic). `httpServer.listen()` is guarded by `require.main === module`; `createMcpServer`, `createHttpServer`, and `SDK_VERSION` are exported.
- `HydratedPlanSchema` `modalSlug` validation now also covers `pool.cta.modalSlug`, not just `state.actions[].modalSlug`.
- `plans://integration/producer` MCP resource pointed at the old `docs/provider-spec.md` path; corrected to `spec/provider-plan.spec.md`.

### Migration

```typescript
// actionModals — add a discriminator
// Before: { slug: "cancel-trial", heading: "...", reasons: [...], ... }
// After:  { type: "feedbackForm", slug: "cancel-trial", heading: "...", reasons: [...], ... }

// imports
// Before: import type { ConfirmActionConfig } from "artisan-roast-sdk";
// After:  import type { FeedbackFormModal, PaymentConfirmModal, ActionModal } from "artisan-roast-sdk";

// rendering — branch on type
const modal = plan.actionModals?.find((m) => m.slug === action.modalSlug);
switch (modal?.type) {
  case "feedbackForm": /* reasons dropdown + keep/confirm */ break;
  case "paymentConfirm": /* confirm charge → spinner + processingMessages */ break;
}

// PlanState switches must add a PENDING case (no longer exhaustive otherwise)
case "PENDING": /* NONE-shaped card: name, statusInfo copy, "Check Status" CTA, spinner */ break;
```

### Consumer migration

- `ecomm-ai-app` — `case "PENDING":` renders a `PendingCard` (not `null`); `ConfirmActionDialog` splits on `modal.type`; dev scenario `dev-pending`; bump SDK ref to `#v0.5.0` (TypeScript flags the non-exhaustive switch + every `ConfirmActionConfig` reference)
- `artisan-roast-platform` — resolver emits `PENDING` while a store is provisioning; grep `ConfirmActionConfig`; run `npm run precheck`

## [0.4.1] - 2026-05-11

### Changed

- **Validation:** `PlanActionSchema` now requires `iconAfter` on actions that have a `url` and a non-`ghost` variant (typically `"external-link"`). Previously unenforced.

### Scaffold corrections

- All `SCENARIOS` actions updated to satisfy the `iconAfter` rule; scaffold contract completed across remaining scenarios.

## [0.4.0] - 2026-05-07

### Changed

- **Breaking:** `TrialState.progress: ProgressBar` → `TrialState.pools: UsagePool[]`
- **Breaking:** `ExpiredState.progress: ProgressBar` → `ExpiredState.pools: UsagePool[]`
- **Breaking:** `ProgressBar` type removed — consumers rendering trial/expired states must switch to `UsagePool[]`

### Added

- `UsagePool.icon?: string` — Lucide icon name rendered before the pool label
- `UsagePool.countLabel?: string` — unit suffix; consumers render `{used} / {limit} {countLabel}`

### Scaffold corrections

- `SELF_HOSTED_FREE` — description corrected to `"Self hosted with community support"`
- `SELF_HOSTED_FREE_WITH_ADDONS` — both pools gain `icon` + `countLabel`
- `PRIORITY_SUPPORT_ACTIVE` — both pools gain `icon` + `countLabel`
- `TRIAL_ACTIVE_NO_CARD` — `progress` replaced with `pools: [trial-days pool]`
- `TRIAL_ACTIVE_CARD_ADDED` — same pools; `add-billing` action removed (card already on file)
- `TRIAL_EXPIRED` — trial-days pool with `used === limit`; actions replaced with `extend-trial` (primary) + `end-trial` (ghost)
- `CONVERTED` / `DIRECT_SUBSCRIBE` — `manage-billing` action already present (no change)
- `INACTIVE` — `inactiveItems` already populated (no change)

### Consumer migration

- `artisan-roast-platform`: grep `progress:`, replace with `pools:` in trial/expired state builders
- `ecomm-ai-app`: remove `ProgressBar` renderer; render trial pools identically to active pools

## [0.3.2] - 2026-05-07

### Added

- `PRIORITY_SUPPORT_NONE` scaffold — NONE state, subscribe action with `iconAfter: "external-link"`, cancel-subscription modal
- `PRIORITY_SUPPORT_ACTIVE` scaffold — ACTIVE state, ticket + session pools with `cta`, manage-billing + cancel in `state.actions`
- `PRIORITY_SUPPORT_INACTIVE` scaffold — INACTIVE state, `inactiveItems`, renew action
- `SELF_HOSTED_FREE_WITH_ADDONS` scaffold — Community plan with residual add-on pool credits; demonstrates pool CTAs persisting across subscription changes

### Fixed

- `SELF_HOSTED_FREE` slug corrected from `"community"` to `"free"` (matches platform DB)

## [0.3.1] - 2026-05-06

### Added

- `UsagePool.cta?: PlanAction` — optional per-pool action (e.g. "Book 1:1 Session" on the sessions pool). Pool-level CTAs persist across plan state changes because add-on credits are account-level, not subscription-level. `UsagePoolSchema` updated to match.

## [0.3.0] - 2026-05-02

### Breaking Changes

- `Plan.details.benefits` changed from `string[]` to `BenefitsBlock` (`{ activeItems: string[], activeHeader?, inactiveItems?, inactiveHeader? }`). Update all providers and consumers — `benefits[n]` is now `benefits.activeItems[n]`.
- `TrialState.daysRemaining` + `TrialState.daysLimit` replaced by `TrialState.progress: ProgressBar`. Same change on `ExpiredState`. Update any reads of these fields.
- `ActiveState.renewalDate` removed — replaced by `ActiveState.statusInfo?: StatusInfo`. Build the renewal sentence server-side and put it in `statusInfo.descText`.
- `InactiveState.previousFeatures` removed — comeback copy now lives in `plan.details.benefits.inactiveItems`. Remove `previousFeatures` from all `INACTIVE` payloads.
- `PlanAction.icon` renamed and split: use `iconBefore?` for icons before the label, `iconAfter?` for icons after. Update all action definitions.

### Added

- `BenefitsBlock` type — `activeItems`/`activeHeader` for normal states, `inactiveItems`/`inactiveHeader` for `INACTIVE` state
- `ProgressBar` type — `{ icon, label, value, total, countLabel }` for time-bounded progress display
- `StatusInfo` type — `{ descIcon?, descText? }` optional secondary description line below the badge
- `InactiveState.badgeIcon` — now supported (was missing from this state variant only)
- `statusInfo?: StatusInfo` added to: `ActiveState`, `TrialState`, `ExpiredState`, `CancelledState`, `InactiveState`
- `INACTIVE` scaffold scenario added to `SCENARIOS` in scaffolds
- `BenefitsBlockSchema`, `ProgressBarSchema`, `StatusInfoSchema` in `validation.ts`

### Migration

```typescript
// benefits
// Before: plan.details.benefits = ["Item one", "Item two"]
// After:  plan.details.benefits = { activeItems: ["Item one", "Item two"] }

// progress (TRIAL / EXPIRED)
// Before: state.daysRemaining = 10, state.daysLimit = 14
// After:  state.progress = { icon: "clock", label: "Trial days", value: 10, total: 14, countLabel: "remaining" }

// statusInfo (ACTIVE)
// Before: state.renewalDate = "2026-05-30"
// After:  state.statusInfo = { descIcon: "rotate-cw", descText: "Renews on May 30, 2026." }

// PlanAction icon
// Before: { icon: "external-link" }
// After:  { iconAfter: "external-link" }   // or iconBefore for leading icons
```

## [0.2.1] - 2026-04-30

### Breaking Changes

- `Plan.actionModal` renamed to `Plan.actionModals` (now an array). Update any `plan.actionModal` reads to `plan.actionModals?.find(m => m.slug === action.modalSlug)`.
- `ConfirmActionConfig` gains two required fields: `slug` (unique within the plan) and `reasonsLabel` (dropdown label). Existing modal objects must add these.

### Added

- `ConfirmActionConfig.slug` — unique identifier; `PlanAction.modalSlug` references this to select the correct dialog per action
- `ConfirmActionConfig.reasonsLabel` — label rendered above the reason dropdown
- `ConfirmActionConfig.other` — optional free-text textarea config (`label`, `placeholder`, `maxLength`)
- `PlanAction.modalSlug` — references a `ConfirmActionConfig` by slug; allows different actions to open different dialogs on the same plan

## [0.2.0] - 2026-04-30

### Breaking Changes

- `PlanState.status` values are now UPPERCASE (`NONE`, `ACTIVE`, `TRIAL`, `EXPIRED`, `CANCELLED`, `INACTIVE`). Update any `=== "active"` comparisons to `=== "ACTIVE"` etc.

### Added

- `zod` and `@modelcontextprotocol/sdk` as production dependencies (prerequisites for Session 2 MCP server)
- `start` and `dev` scripts in `package.json` for running the MCP server

## [0.1.0] - 2026-04-29

### Added <!-- markdownlint-disable-line MD024 -->

- `plans` namespace — full plan provider contract
  - `Plan` — static plan definition (slug, pricing, details, visibility, actionModal)
  - `PlanDetails` — rich detail shape (sla, scope, terms, quotas, benefits, excludes)
  - `ConfirmActionConfig` — reason-capture dialog config (cancel, downgrade, etc.)
  - `HydratedPlan` — plan definition with computed per-instance `state` attached
  - `PlanState` — discriminated union: `NONE | ACTIVE | TRIAL | EXPIRED | CANCELLED | INACTIVE`
  - `PlanAction` — CTA descriptor (slug, label, url, endpoint, icon, variant, disabled)
  - `UsagePool` — progress bar data (slug, label, limit, used, purchased)
  - `PlansResponse` — shape for `GET /api/plans` (public, unauthenticated)
  - `ResolvedPlansResponse` — shape for `GET /api/plans/resolved` (Bearer auth, per-instance)
- Subpath export: `artisan-roast-sdk/plans`

[Unreleased]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.5.1...HEAD
[0.5.1]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.3.2...v0.4.0
[0.3.2]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yuens1002/artisan-roast-sdk/releases/tag/v0.1.0
