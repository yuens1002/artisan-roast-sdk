# UsagePool Extension + ProgressBar Removal: ACs

**Branch:** `feat/usagepool-extension`
**Version target:** v0.3.3

---

## Functional Acceptance Criteria — Type changes

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-1 | `ProgressBar` type removed | Code review: `src/plans/index.ts` | No `ProgressBar` interface anywhere in `src/` | | | |
| AC-FN-2 | `TrialState` uses `pools` | Code review: `src/plans/index.ts` | `TrialState` has `pools: UsagePool[]`; no `progress` field | | | |
| AC-FN-3 | `ExpiredState` uses `pools` | Code review: `src/plans/index.ts` | `ExpiredState` has `pools: UsagePool[]`; no `progress` field | | | |
| AC-FN-4 | `UsagePool.icon` added | Code review: `src/plans/index.ts` | `icon?: string` on `UsagePool`; JSDoc: Lucide icon name rendered before pool label | | | |
| AC-FN-5 | `UsagePool.countLabel` added | Code review: `src/plans/index.ts` | `countLabel?: string` on `UsagePool`; JSDoc: unit suffix for `{used} / {limit} {countLabel}` | | | |

---

## Functional Acceptance Criteria — Zod schemas

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-6 | `ProgressBarSchema` removed | Code review: `src/plans/validation.ts` | No `ProgressBarSchema` in `src/` | | | |
| AC-FN-7 | `UsagePoolSchema` updated | Code review: `src/plans/validation.ts` | Includes `icon: z.string().optional()` and `countLabel: z.string().optional()` | | | |
| AC-FN-8 | `TrialStateSchema` updated | Code review: `src/plans/validation.ts` | Uses `pools: z.array(UsagePoolSchema)`; no `progress` field | | | |
| AC-FN-9 | `ExpiredStateSchema` updated | Code review: `src/plans/validation.ts` | Uses `pools: z.array(UsagePoolSchema)`; no `progress` field | | | |

---

## Functional Acceptance Criteria — Scaffold corrections

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-10 | `SELF_HOSTED_FREE` description | Code review: `src/plans/scaffolds.ts` | `description === "Self hosted with community support"` | | | |
| AC-FN-11 | `SELF_HOSTED_FREE_WITH_ADDONS` pools | Code review: `src/plans/scaffolds.ts` | Both pools have `icon` and `countLabel` | | | |
| AC-FN-12 | `PRIORITY_SUPPORT_ACTIVE` pools | Code review: `src/plans/scaffolds.ts` | Both pools have `icon` and `countLabel` | | | |
| AC-FN-13 | `TRIAL_ACTIVE_NO_CARD` pools | Code review: `src/plans/scaffolds.ts` | `state.pools` has a pool with `slug: "trial-days"`, `icon: "clock"`, `label: "Trial remaining"`, `countLabel: "days"`; no `progress` field | | | |
| AC-FN-14 | `TRIAL_ACTIVE_CARD_ADDED` actions | Code review: `src/plans/scaffolds.ts` | `state.actions` has `cancel-trial` only; no `add-billing` action; same pools as `TRIAL_ACTIVE_NO_CARD` | | | |
| AC-FN-15 | `TRIAL_EXPIRED` redesign | Code review: `src/plans/scaffolds.ts` | Trial-days pool with `used === limit`; `statusInfo.descText` non-empty; `state.actions` has exactly 2 — `extend-trial` (primary) + `end-trial` (ghost) | | | |
| AC-FN-16 | `CONVERTED` actions | Code review: `src/plans/scaffolds.ts` | `state.actions` non-empty; includes manage-billing | | | |
| AC-FN-17 | `DIRECT_SUBSCRIBE` actions | Code review: `src/plans/scaffolds.ts` | `state.actions` non-empty; includes manage-billing | | | |
| AC-FN-18 | `INACTIVE` benefits | Code review: `src/plans/scaffolds.ts` | `plan.details.benefits.inactiveItems` is a non-empty array; `deactivatedAt` is a past ISO date | | | |

---

## Validation Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-VAL-1 | All modified scaffolds valid | MCP: `validate_plan_payload` on each updated scenario | `{ valid: true }` for all | | | |
| AC-VAL-2 | Unmodified scaffolds unaffected | MCP: `validate_plan_payload` on remaining scenarios | `{ valid: true }` — zero regressions | | | |

---

## Build Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-BLD-1 | TypeScript clean | `npm run typecheck` | 0 errors | | | |
| AC-BLD-2 | `dist/` updated | `npm run build` | `dist/index.d.ts` exports `UsagePool` with `icon?` + `countLabel?`; no `ProgressBar` export | | | |
