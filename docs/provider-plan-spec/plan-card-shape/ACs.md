# Plan Card Shape: ACs

**Branch:** `feat/plan-card-shape`
**Version target:** v0.3.0 (breaking)
**Status:** implementation pending — see `plan.md` for full spec

---

> ACs to be authored when implementation begins. The design spec in `plan.md` is the source of truth.
> Each breaking change in the spec maps to one or more `AC-FN-*` entries below; fill in the Pass conditions from the spec before starting implementation.

## Functional Acceptance Criteria — Type changes

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-1 | `BenefitsBlock` type present | Code review: `src/plans/index.ts` | Interface exported with `activeItems`, `activeHeader?`, `inactiveItems?`, `inactiveHeader?` | | | |
| AC-FN-2 | `Plan.details.benefits` is `BenefitsBlock` | Code review: `src/plans/index.ts` | Field typed as `BenefitsBlock`, not `string[]` | | | |
| AC-FN-3 | `ProgressBar` type present | Code review: `src/plans/index.ts` | Interface exported with `icon`, `label`, `value`, `total`, `countLabel` | | | |
| AC-FN-4 | `TrialState.progress` is `ProgressBar` | Code review: `src/plans/index.ts` | Field present, typed `ProgressBar` | | | |
| AC-FN-5 | `ExpiredState.progress` is `ProgressBar` | Code review: `src/plans/index.ts` | Field present, typed `ProgressBar` | | | |
| AC-FN-6 | `StatusInfo` type present | Code review: `src/plans/index.ts` | Interface exported with `descIcon?`, `descText?` | | | |
| AC-FN-7 | `PlanAction.icon` split to `iconBefore` + `iconAfter` | Code review: `src/plans/index.ts` | No `icon` field on `PlanAction`; both `iconBefore?` and `iconAfter?` present | | | |
| AC-FN-8 | `InactiveState.previousFeatures` removed | Code review: `src/plans/index.ts` | No `previousFeatures` field on `InactiveState` | | | |
| AC-FN-9 | `ActiveState.renewalDate` removed | Code review: `src/plans/index.ts` | No `renewalDate` field; replaced by `statusInfo?: StatusInfo` | | | |

## Build Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-BLD-1 | TypeScript clean | `npm run typecheck` | 0 errors | | | |
| AC-BLD-2 | Build succeeds | `npm run build` | `dist/index.d.ts` exports all new types | | | |
| AC-BLD-3 | `provider-spec.md` version bumped | Code review: `spec/provider-plan.spec.md` | `**Version:** 0.3.0` at top | | | |
