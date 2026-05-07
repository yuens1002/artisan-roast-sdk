# Session 1 — Foundations: ACs

**Branch:** `feat/v0.2.0-foundations`
**Commit target:** `chore: v0.2.0 — PlanState UPPERCASE + repo foundations`

---

## Functional Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-1 | `NoneState.status` is `"NONE"` | Code review: `src/plans/index.ts` | Literal is `"NONE"`, no lowercase `"none"` anywhere in the file | | | |
| AC-FN-2 | `ActiveState.status` is `"ACTIVE"` | Code review: `src/plans/index.ts` | Literal is `"ACTIVE"` | | | |
| AC-FN-3 | `TrialState.status` is `"TRIAL"` | Code review: `src/plans/index.ts` | Literal is `"TRIAL"` | | | |
| AC-FN-4 | `ExpiredState.status` is `"EXPIRED"` | Code review: `src/plans/index.ts` | Literal is `"EXPIRED"` | | | |
| AC-FN-5 | `CancelledState.status` is `"CANCELLED"` | Code review: `src/plans/index.ts` | Literal is `"CANCELLED"` | | | |
| AC-FN-6 | `InactiveState.status` is `"INACTIVE"` | Code review: `src/plans/index.ts` | Literal is `"INACTIVE"` | | | |
| AC-FN-7 | `package.json` version is `0.2.0` | Code review: `package.json` | `"version": "0.2.0"` | | | |
| AC-FN-8 | `zod` and `@modelcontextprotocol/sdk` are listed as dependencies | Code review: `package.json` | Both appear under `"dependencies"` (not devDependencies) | | | |
| AC-FN-9 | `provider-spec.md` state examples all use UPPERCASE | Code review: `docs/provider-spec.md` | No lowercase status value (`"none"`, `"active"`, `"trial"`, `"expired"`, `"cancelled"`, `"inactive"`) appears in any JSON example block | | | |
| AC-FN-10 | `.gitignore` excludes `.ai/` and `dist/` | Code review: `.gitignore` | Both `.ai/` and `dist/` are present | | | |
| AC-FN-11 | `CONTRIBUTING.md` covers all required sections | Code review: `CONTRIBUTING.md` | Contains: What this is, Architecture, Key conventions (UPPERCASE rule present), Setup, Making changes, Adding a module, Consumer repos | | | |
| AC-FN-12 | `.skills/doc.md` exists with documentation procedure | Code review: `.skills/doc.md` | File present; contains when to update CHANGELOG, provider-spec, and types reference | | | |
| AC-FN-13 | `.skills/workflow.md` exists with ship procedure | Code review: `.skills/workflow.md` | File present; contains branch → build → version → tag → notify steps | | | |
| AC-FN-14 | `CHANGELOG.md` has a `[0.2.0]` section | Code review: `CHANGELOG.md` | Section present; lists `PlanState UPPERCASE` as a breaking change | | | |

---

## Build Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-BLD-1 | TypeScript compiles clean | Run: `npm run typecheck` | 0 errors, 0 warnings | | | |
| AC-BLD-2 | `npm run build` produces `dist/` | Run: `npm run build` | `dist/index.js`, `dist/index.mjs`, `dist/index.d.ts` all present | | | |
| AC-BLD-3 | Exported types are importable | Code review: `dist/index.d.ts` | `Plan`, `HydratedPlan`, `PlanState`, `PlanAction`, `UsagePool`, `ConfirmActionConfig` all appear in the `.d.ts` | | | |

---

## Regression Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-REG-1 | No lowercase status literals remain in `src/` | Run: `grep -r '"none"\|"active"\|"trial"\|"expired"\|"cancelled"\|"inactive"' src/` | Zero matches | | | |
| AC-REG-2 | `PlanState` discriminated union is exhaustive | Code review: `src/plans/index.ts` | Union covers exactly: `NONE`, `ACTIVE`, `TRIAL`, `EXPIRED`, `CANCELLED`, `INACTIVE` | | | |
