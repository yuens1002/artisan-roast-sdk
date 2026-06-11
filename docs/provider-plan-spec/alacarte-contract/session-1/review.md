# /review report — feat/alacarte-contract

**Branch:** `feat/alacarte-contract`
**Generated:** 2026-06-11
**Iterations to reach verified:** 0 (one README fix applied during /review; no AC failures)

---

## Verdict

**Minor — fixed before handoff.** All deliverables shipped, all 23 tests pass, one README drift item was fixed inline during this review step. One acknowledged test weakness (AC-TST-4) is informational only; no blocking issues remain.

---

## Step 0: Role context (structural exception)

No `.claude/commands/` exists globally or project-locally — this is a new project with no compounding role-skill history. De-facto owning roles derived from the plan's deliverables table:

- `/backend-architect` — D1, D2, D3, D4, D5, D6, D7 (all type/schema/scaffold/config/docs work)
- `/test-engineer` — D8 (test file)
- `/devops` — AC-REG-2 (typecheck gate)

`/retro` recommendations below are phrased as first-entry principles for these roles' skill files.

---

## Step 1: Deliverables ↔ Code

| Deliverable | Implementation | Status |
|-------------|----------------|--------|
| D1 — AlaCartePool, AlaCartePackage, AddOnsResponse types + Zod schemas | `src/alacarte/index.ts:11–94` | ✓ shipped |
| D2 — CheckoutRequest discriminated union + CheckoutResponse + schemas | `src/alacarte/index.ts:49–98` | ✓ shipped |
| D3 — ALACARTE_SCENARIOS + ALACARTE_SCENARIO_KEYS | `src/alacarte/scaffolds.ts:1–20` | ✓ shipped |
| D4 — `./alacarte` export entry in package.json | `package.json:22–26` | ✓ shipped |
| D5 — `export * from "./alacarte"` in src/index.ts | `src/index.ts:11` | ✓ shipped |
| D6 — Spec update: GET /api/add-ons + POST /api/checkout | `spec/provider-plan.spec.md` (added ~82 lines) | ✓ shipped |
| D7 — CHANGELOG v0.6.0 entry | `CHANGELOG.md:8–25` | ✓ shipped |
| D8 — test/alacarte.test.cjs | `test/alacarte.test.cjs:1–44` | ✓ shipped |

### Code changes not tied to any deliverable

- **`dist/plans/validation.d.ts`** (204 lines changed) — cosmetic field-order reorder (`heading`/`description` swap) in generated TypeScript declaration output. Source `src/plans/validation.ts` is unchanged (verified via `git diff`). This is a non-functional TSC emitter artifact triggered by the full rebuild. Benign; no action required.
- **`.claude/verification-status.json`** — workflow state artifact, not a plan deliverable. Expected.

---

## Step 2: ACs ↔ Tests (Gate 3 spot-check)

| AC | Test name | Asserts invariant? | Notes |
|----|-----------|---------------------|-------|
| AC-TST-1 | `TICKETS_5 scaffold round-trips through AlaCartePackageSchema` | ✓ | Fixture and schema are independently defined; parse acceptance is genuine conformance |
| AC-TST-2 | `SESSIONS_2 scaffold round-trips through AlaCartePackageSchema` | ✓ | Same |
| AC-TST-3 | `AddOnsResponseSchema accepts a payload wrapping both scaffolds` | ✓ | Exercises the `packages[]` nesting invariant specifically |
| AC-TST-4 | `ALACARTE_SCENARIO_KEYS has length 2 and contains both scenario keys` | ⚠ weak | AC label says "CheckoutRequest planSlug variant". Actual test covers SCENARIO_KEYS shape — correct and useful, but unrelated to CheckoutRequest. CheckoutRequest is TS-only by design (no Zod schema per spec decision D3). The build clean is the real CheckoutRequest proof; no runtime test for it exists. Acknowledged in QC column. |
| AC-TST-5 | `CheckoutResponseSchema accepts { url: string }` + `CheckoutResponseSchema rejects missing url` | ✓ | Both acceptance and rejection arms tested; `url` absence yields `success: false` |

**AC-TST-4 detail:** the mismatch is a labelling issue, not a coverage gap. The SCENARIO_KEYS test is correct and valuable; it just shouldn't be cited as CheckoutRequest coverage. `CheckoutRequest` discrimination is proven by the TypeScript type system (build clean); no runtime Zod counterpart exists by deliberate design. The AC label should be updated to match what the test actually asserts.

---

## Step 3: Docs drift

**Fixed inline during this review step (committed as `docs(readme): add ./alacarte...`):**

| File | Stale claim | Fix applied |
|------|-------------|-------------|
| `README.md:52–58` | "What you need to implement — Two endpoints" with only GET /api/plans and GET /api/plans/resolved | Added GET /api/add-ons + POST /api/checkout as optional add-ons endpoints |
| `README.md:64–68` | Packages table missing `artisan-roast-sdk/alacarte` row | Added `artisan-roast-sdk/alacarte \| À la carte types, schemas, and scaffold fixtures` |

**No remaining drift found:**

- `CHANGELOG.md` — v0.6.0 entry present, all four new types + schemas + scaffolds listed ✓
- `spec/provider-plan.spec.md` — version bumped to 0.6.0, both new endpoint sections added ✓
- `src/plans/index.ts`, `src/plans/validation.ts`, `src/plans/scaffolds.ts` — none touched ✓

---

## Recommendations

1. **Fix AC-TST-4 label in ACs.md** — rename from "CheckoutRequest planSlug variant accepted at runtime" to "ALACARTE_SCENARIO_KEYS shape: length 2, both keys present". The test is correct and valuable; the AC label is the mismatch. Minor — can be done in retro or pre-merge cleanup.

2. **Consider adding a `./alacarte/scaffolds` export path** — consistent with `./plans/scaffolds`. Not a bug (ALACARTE_SCENARIOS is already accessible via `./alacarte`), but the pattern diverges from the existing plans surface. Optional improvement for a follow-on patch.

---

## Inputs for /retro

These are first-entry draft principles for roles with no existing skill files.

- **Route:** `/backend-architect` → `~/.claude/commands/backend-architect.md`
  **Draft principle:** *"When a discriminated TypeScript union has no Zod runtime counterpart (by deliberate design), document the design decision in the type comment (`// The two variants are mutually exclusive — assigning both keys is a type error`) and confirm it in the AC Pass cell. Build clean is the runtime proof; the AC label must state that (not `"accepted at runtime via Zod"`)."*
  **Triggered by:** AC-TST-4 label vs actual test mismatch.

- **Route:** `/test-engineer` → `~/.claude/commands/test-engineer.md`
  **Draft principle:** *"AC-TST-* labels must match what the test actually asserts. When the AC's stated subject (e.g. `CheckoutRequest` discrimination) has no runtime Zod schema, the test should either (a) be renamed to describe what it does test, or (b) exercise a structural invariant that stands in for the missing schema (e.g. assert the shape has `alaCarteSlug` and not `planSlug`)."*
  **Triggered by:** AC-TST-4 — test covers SCENARIO_KEYS shape but AC label claimed CheckoutRequest coverage.

- **Route:** `/backend-architect` (Gate 1 process) → `~/.claude/commands/backend-architect.md`
  **Draft principle:** *"During AC authoring, every deliverable must have at least one AC with its Plan ref. Docs-only deliverables (spec update D6, `src/index.ts` re-export D5) are easy to miss — add AC-COV entries for them at authoring time rather than discovering the gap in /review."*
  **Triggered by:** D5 and D6 had no Plan-ref AC at planning time; AC-COV-1 and AC-COV-2 were added post-Gate-1.
