# À La Carte Contract S1 — Acceptance Criteria

**Branch:** `feat/alacarte-contract` · **Version target:** v0.6.0
**Plan:** [`../plan.md`](../plan.md)

---

## Type & Schema Acceptance Criteria

| AC | Plan ref | Role | What | How | Pass | Agent | QC | Reviewer |
|----|----------|------|------|-----|------|-------|----|----------|
| AC-TYPE-1 | D1, D4 | `/backend-architect` | `AlaCartePool`, `AlaCartePackage`, `AddOnsResponse` exported from `./alacarte` | Code review: `src/alacarte/index.ts` + `package.json` exports | All three interfaces present; `package.json` has `"./alacarte"` export pointing to `dist/alacarte/index.{js,d.ts}` | | | |
| AC-TYPE-2 | D2 | `/backend-architect` | `CheckoutRequest` is a discriminated union — planSlug variant and alaCarteSlug variant are mutually exclusive | Code review: `src/alacarte/index.ts` | TypeScript: assigning `{ planSlug: "x", alaCarteSlug: "y" }` to `CheckoutRequest` produces a type error; each variant compiles cleanly in isolation | | | |
| AC-TYPE-3 | D2 | `/backend-architect` | `CheckoutResponse` exported with a single `url: string` field | Code review: `src/alacarte/index.ts` | Interface present; `url` is non-optional string | | | |
| AC-TYPE-4 | D1, D2 | `/backend-architect` | Zod schemas: `AlaCartePoolSchema`, `AlaCartePackageSchema`, `AddOnsResponseSchema`, `CheckoutResponseSchema` present and exported | Code review: `src/alacarte/index.ts` | All four schemas exported; `AddOnsResponseSchema` passes `z.parse` against both scaffold fixtures (no throw) | | | |
| AC-TYPE-5 | D1 | `/backend-architect` | `AlaCartePool` does NOT extend `UsagePool` — it is a distinct minimal type | Code review: `src/alacarte/index.ts` | `AlaCartePool` has exactly `{ slug, label, quantity }` — no `used`, `limit`, `purchased`, `icon`, `countLabel`, `cta` fields | | | |

## Scaffold Acceptance Criteria

| AC | Plan ref | Role | What | How | Pass | Agent | QC | Reviewer |
|----|----------|------|------|-----|------|-------|----|----------|
| AC-SCAF-1 | D3 | `/backend-architect` | `ALACARTE_SCENARIOS.TICKETS_5` satisfies `AlaCartePackage` | Code review: `src/alacarte/scaffolds.ts` | `satisfies AlaCartePackage` in the `as const satisfies` declaration; `tsc --noEmit` clean | | | |
| AC-SCAF-2 | D3 | `/backend-architect` | `ALACARTE_SCENARIOS.SESSIONS_2` satisfies `AlaCartePackage` | Code review: `src/alacarte/scaffolds.ts` | Same | | | |
| AC-SCAF-3 | D3 | `/backend-architect` | `ALACARTE_SCENARIO_KEYS` is a typed tuple of the scenario key names | Code review: `src/alacarte/scaffolds.ts` | Typed as `("TICKETS_5" \| "SESSIONS_2")[]`; length 2 | | | |
| AC-SCAF-4 | D3, D4 | `/backend-architect` | Both scaffolds exported from `./alacarte` path | Code review: `package.json` + `src/alacarte/index.ts` | `import { ALACARTE_SCENARIOS } from "artisan-roast-sdk/alacarte"` resolves without error | | | |

## Test Acceptance Criteria

| AC | Plan ref | Role | What | How | Pass | Agent | QC | Reviewer |
|----|----------|------|------|-----|------|-------|----|----------|
| AC-TST-1 | D8 | `/test-engineer` | `TICKETS_5` scaffold round-trips through `AlaCartePackageSchema` | Test run: `npm run build && npm test` | `test/alacarte.test.cjs` — `AlaCartePackageSchema.safeParse(ALACARTE_SCENARIOS.TICKETS_5)` returns `success: true` | | | |
| AC-TST-2 | D8 | `/test-engineer` | `SESSIONS_2` scaffold round-trips through `AlaCartePackageSchema` | Test run: `npm run build && npm test` | `AlaCartePackageSchema.safeParse(ALACARTE_SCENARIOS.SESSIONS_2)` returns `success: true` | | | |
| AC-TST-3 | D8 | `/test-engineer` | `AddOnsResponseSchema` accepts a payload wrapping both scaffolds | Test run: `npm run build && npm test` | `AddOnsResponseSchema.safeParse({ packages: [TICKETS_5, SESSIONS_2] })` returns `success: true` | | | |
| AC-TST-4 | D8 | `/test-engineer` | `CheckoutRequest` planSlug variant accepted at runtime via a discriminated parse helper | Test run: `npm run build && npm test` | Test constructs `{ planSlug: "house-blend" }` — asserted valid by manual structural check (TS-only union; no Zod schema for CheckoutRequest, so test verifies the shape compiles and matches expected keys) | | | |
| AC-TST-5 | D8 | `/test-engineer` | `CheckoutResponseSchema` accepts `{ url: "https://..." }` and rejects `{}` | Test run: `npm run build && npm test` | Valid parse returns `success: true`; missing `url` parse returns `success: false` | | | |

## Regression Acceptance Criteria

| AC | Plan ref | Role | What | How | Pass | Agent | QC | Reviewer |
|----|----------|------|------|-----|------|-------|----|----------|
| AC-REG-1 | — | `/test-engineer` | Existing plans types unchanged | Code review: `src/plans/index.ts`, `src/plans/validation.ts` | No modification to any existing interface, type, or schema; `HydratedPlanSchema` unchanged | | | |
| AC-REG-2 | — | `/devops` | `tsc --noEmit` clean on full SDK | Test run: `npm run typecheck` | 0 type errors | | | |
| AC-REG-3 | — | `/test-engineer` | Existing plan scaffold imports unaffected | Code review: `src/plans/scaffolds.ts` | `SCENARIOS` and `SCENARIO_KEYS` unchanged; existing consumers can still `import { SCENARIOS } from "artisan-roast-sdk/plans/scaffolds"` | | | |
| AC-REG-4 | — | `/test-engineer` | Existing test suite passes | Test run: `npm run build && npm test` | All pre-existing tests in `test/validation.test.cjs` and `test/server.test.cjs` pass, 0 failures | | | |
| AC-REG-5 | D7 | `/backend-architect` | CHANGELOG updated | Code review: `CHANGELOG.md` | v0.6.0 entry present describing all four new types + two scaffold exports | | | |
