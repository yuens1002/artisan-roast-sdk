# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yuens1002/artisan-roast-sdk/releases/tag/v0.1.0
