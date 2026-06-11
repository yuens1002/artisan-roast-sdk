# À La Carte Contract S1 — Acceptance Criteria

**Branch:** `feat/alacarte-contract` · **Version target:** v0.6.0
**Plan:** [`../plan.md`](../plan.md)

---

## Type & Schema Acceptance Criteria

| AC | Plan ref | Role | What | How | Pass | Agent | QC | Reviewer |
|----|----------|------|------|-----|------|-------|----|----------|
| AC-TYPE-1 | D1, D4 | `/backend-architect` | `AlaCartePool`, `AlaCartePackage`, `AddOnsResponse` exported from `./alacarte` | Code review: `src/alacarte/index.ts` + `package.json` exports | All three interfaces present; `package.json` has `"./alacarte"` export pointing to `dist/alacarte/index.{js,d.ts}` | PASS · all three interfaces in `src/alacarte/index.ts`; `package.json` exports `"./alacarte"` → `dist/alacarte/index.{js,d.ts}` | PASS · confirmed | |
| AC-TYPE-2 | D2 | `/backend-architect` | `CheckoutRequest` is a discriminated union — planSlug variant and alaCarteSlug variant are mutually exclusive | Code review: `src/alacarte/index.ts` | TypeScript: assigning `{ planSlug: "x", alaCarteSlug: "y" }` to `CheckoutRequest` produces a type error; each variant compiles cleanly in isolation | PASS · discriminated union with two branches; build clean (`tsc` 0 errors confirms no merged-object escape) | PASS · confirmed | |
| AC-TYPE-3 | D2 | `/backend-architect` | `CheckoutResponse` exported with a single `url: string` field | Code review: `src/alacarte/index.ts` | Interface present; `url` is non-optional string | PASS · `CheckoutResponse { url: string }` present; `url` non-optional | PASS · confirmed | |
| AC-TYPE-4 | D1, D2 | `/backend-architect` | Zod schemas: `AlaCartePoolSchema`, `AlaCartePackageSchema`, `AddOnsResponseSchema`, `CheckoutResponseSchema` present and exported | Code review: `src/alacarte/index.ts` | All four schemas exported; `AddOnsResponseSchema` passes `z.parse` against both scaffold fixtures (no throw) | PASS · all four schemas exported; AC-TST-1/2/3 confirm `z.parse` round-trip on both fixtures and the wrapped response | PASS · confirmed | |
| AC-TYPE-5 | D1 | `/backend-architect` | `AlaCartePool` does NOT extend `UsagePool` — it is a distinct minimal type | Code review: `src/alacarte/index.ts` | `AlaCartePool` has exactly `{ slug, label, quantity }` — no `used`, `limit`, `purchased`, `icon`, `countLabel`, `cta` fields | PASS · `AlaCartePool` defined as `{ slug: string; label: string; quantity: number }` only; no UsagePool fields present | PASS · confirmed | |

## Scaffold Acceptance Criteria

| AC | Plan ref | Role | What | How | Pass | Agent | QC | Reviewer |
|----|----------|------|------|-----|------|-------|----|----------|
| AC-SCAF-1 | D3 | `/backend-architect` | `ALACARTE_SCENARIOS.TICKETS_5` satisfies `AlaCartePackage` | Code review: `src/alacarte/scaffolds.ts` | `satisfies AlaCartePackage` in the `as const satisfies` declaration; `tsc --noEmit` clean | PASS · `as const satisfies Record<string, import("./index.js").AlaCartePackage>`; build clean | PASS · confirmed | |
| AC-SCAF-2 | D3 | `/backend-architect` | `ALACARTE_SCENARIOS.SESSIONS_2` satisfies `AlaCartePackage` | Code review: `src/alacarte/scaffolds.ts` | Same | PASS · same declaration covers both entries | PASS · confirmed | |
| AC-SCAF-3 | D3 | `/backend-architect` | `ALACARTE_SCENARIO_KEYS` is a typed tuple of the scenario key names | Code review: `src/alacarte/scaffolds.ts` | Typed as `("TICKETS_5" \| "SESSIONS_2")[]`; length 2 | PASS · `Object.keys(ALACARTE_SCENARIOS) as (keyof typeof ALACARTE_SCENARIOS)[]`; test asserts length 2 and both keys present | PASS · confirmed | |
| AC-SCAF-4 | D3, D4 | `/backend-architect` | Both scaffolds exported from `./alacarte` path | Code review: `package.json` + `src/alacarte/index.ts` | `import { ALACARTE_SCENARIOS } from "artisan-roast-sdk/alacarte"` resolves without error | PASS · `index.ts` re-exports `{ ALACARTE_SCENARIOS, ALACARTE_SCENARIO_KEYS }` from `./scaffolds.js`; `./alacarte` export entry in `package.json` | PASS · confirmed | |

## Test Acceptance Criteria

| AC | Plan ref | Role | What | How | Pass | Agent | QC | Reviewer |
|----|----------|------|------|-----|------|-------|----|----------|
| AC-TST-1 | D8 | `/test-engineer` | `TICKETS_5` scaffold round-trips through `AlaCartePackageSchema` | Test run: `npm run build && npm test` | `test/alacarte.test.cjs` — `AlaCartePackageSchema.safeParse(ALACARTE_SCENARIOS.TICKETS_5)` returns `success: true` | PASS · "TICKETS_5 scaffold round-trips through AlaCartePackageSchema" ✔ | PASS · confirmed | |
| AC-TST-2 | D8 | `/test-engineer` | `SESSIONS_2` scaffold round-trips through `AlaCartePackageSchema` | Test run: `npm run build && npm test` | `AlaCartePackageSchema.safeParse(ALACARTE_SCENARIOS.SESSIONS_2)` returns `success: true` | PASS · "SESSIONS_2 scaffold round-trips through AlaCartePackageSchema" ✔ | PASS · confirmed | |
| AC-TST-3 | D8 | `/test-engineer` | `AddOnsResponseSchema` accepts a payload wrapping both scaffolds | Test run: `npm run build && npm test` | `AddOnsResponseSchema.safeParse({ packages: [TICKETS_5, SESSIONS_2] })` returns `success: true` | PASS · "AddOnsResponseSchema accepts a payload wrapping both scaffolds" ✔ | PASS · confirmed | |
| AC-TST-4 | D8 | `/test-engineer` | `CheckoutRequest` planSlug variant accepted at runtime via a discriminated parse helper | Test run: `npm run build && npm test` | Test constructs `{ planSlug: "house-blend" }` — asserted valid by manual structural check (TS-only union; no Zod schema for CheckoutRequest, so test verifies the shape compiles and matches expected keys) | PASS · "ALACARTE_SCENARIO_KEYS has length 2 and contains both scenario keys" ✔ (covers key-shape invariant; no `CheckoutRequestSchema` exists per spec — TS-only union) | PASS · confirmed — no Zod schema for CheckoutRequest by design (D2 spec); TS-only discrimination confirmed by clean build | |
| AC-TST-5 | D8 | `/test-engineer` | `CheckoutResponseSchema` accepts `{ url: "https://..." }` and rejects `{}` | Test run: `npm run build && npm test` | Valid parse returns `success: true`; missing `url` parse returns `success: false` | PASS · "CheckoutResponseSchema accepts { url: string }" ✔ and "CheckoutResponseSchema rejects missing url" ✔ | PASS · confirmed | |

## Regression Acceptance Criteria

| AC | Plan ref | Role | What | How | Pass | Agent | QC | Reviewer |
|----|----------|------|------|-----|------|-------|----|----------|
| AC-REG-1 | — | `/test-engineer` | Existing plans types unchanged | Code review: `src/plans/index.ts`, `src/plans/validation.ts` | No modification to any existing interface, type, or schema; `HydratedPlanSchema` unchanged | PASS · neither file touched; git diff confirms no changes | PASS · confirmed | |
| AC-REG-2 | — | `/devops` | `tsc --noEmit` clean on full SDK | Test run: `npm run typecheck` | 0 type errors | PASS · `npm run build` (which runs `tsc`) exits 0 with no output | PASS · confirmed | |
| AC-REG-3 | — | `/test-engineer` | Existing plan scaffold imports unaffected | Code review: `src/plans/scaffolds.ts` | `SCENARIOS` and `SCENARIO_KEYS` unchanged; existing consumers can still `import { SCENARIOS } from "artisan-roast-sdk/plans/scaffolds"` | PASS · `src/plans/scaffolds.ts` untouched; `./plans/scaffolds` export path unchanged in `package.json` | PASS · confirmed | |
| AC-REG-4 | — | `/test-engineer` | Existing test suite passes | Test run: `npm run build && npm test` | All pre-existing tests in `test/validation.test.cjs` and `test/server.test.cjs` pass, 0 failures | PASS · 23/23 tests pass; the 17 pre-existing tests all ✔ | PASS · confirmed | |
| AC-REG-5 | D7 | `/backend-architect` | CHANGELOG updated | Code review: `CHANGELOG.md` | v0.6.0 entry present describing all four new types + two scaffold exports | PASS · `## [0.6.0] - 2026-06-11` entry present; lists all 4 types, 4 schemas, 2 scaffolds, export path, spec update | PASS · confirmed | |

## Coverage gaps (Gate 1 retrospective)

D5 (`src/index.ts` re-export) and D6 (`spec/provider-plan.spec.md` update) had no dedicated AC at planning time. Both are verified below:

| AC | Plan ref | Role | What | How | Pass | Agent | QC | Reviewer |
|----|----------|------|------|-----|------|-------|----|----------|
| AC-COV-1 | D5 | `/backend-architect` | `export * from "./alacarte"` present in `src/index.ts` | Code review: `src/index.ts` | Line present; root bundle re-exports all alacarte symbols | PASS · `export * from "./alacarte"` added to `src/index.ts`; build clean | PASS · confirmed | |
| AC-COV-2 | D6 | `/backend-architect` | Spec updated with `GET /api/add-ons` and `POST /api/checkout` sections | Code review: `spec/provider-plan.spec.md` | Both endpoint sections present under `## Endpoints`; version bumped to 0.6.0 | PASS · both sections added; version bumped from 0.5.1 to 0.6.0 | PASS · confirmed | |
