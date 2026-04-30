# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-04-29

### Added

- `plans` namespace — full plan provider contract
  - `Plan` — static plan definition (slug, pricing, details, visibility, actionModal)
  - `PlanDetails` — rich detail shape (sla, scope, terms, quotas, benefits, excludes)
  - `ConfirmActionConfig` — reason-capture dialog config (cancel, downgrade, etc.)
  - `HydratedPlan` — plan definition with computed per-instance `state` attached
  - `PlanState` — discriminated union: `none | active | trial | expired | cancelled | inactive`
  - `PlanAction` — CTA descriptor (slug, label, url, endpoint, icon, variant, disabled)
  - `UsagePool` — progress bar data (slug, label, limit, used, purchased)
  - `PlansResponse` — shape for `GET /api/plans` (public, unauthenticated)
  - `ResolvedPlansResponse` — shape for `GET /api/plans/resolved` (Bearer auth, per-instance)
- Subpath export: `artisan-roast-sdk/plans`

[Unreleased]: https://github.com/yuens1002/artisan-roast-sdk/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yuens1002/artisan-roast-sdk/releases/tag/v0.1.0
