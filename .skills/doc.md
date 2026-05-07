# Documentation Skill

How to keep SDK docs in sync with code changes. Follow this any time you modify a type, add a module, or change a contract.

---

## When to update what

| Change | Files to update |
|--------|----------------|
| Add or rename a type field | `src/{module}/index.ts` + `spec/{module}.spec.md` + `CHANGELOG.md` |
| Change a status literal | Same as above — also grep consumer repos for the old value |
| Add a new state variant | `src/plans/index.ts` + `spec/provider-plan.spec.md` (new variant section) + `src/plans/validation.ts` (new zod branch) + `src/mcp/tools/plans.ts` (new scaffold scenario) |
| Add a new module | New `src/{module}/index.ts` + new `spec/{module}.spec.md` + new `src/mcp/tools/{module}.ts` + new `src/mcp/resources/{module}.ts` + re-export in `src/index.ts` |
| Breaking change | All of the above + `CHANGELOG.md` major/minor bump section + notify consumer repos |
| New body of work | Create `docs/{area}/{feature-name}/plan.md` + `ACs.md` before starting |

---

## CHANGELOG format

Add a new section at the top of `CHANGELOG.md`. Follow this structure exactly:

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Breaking Changes
- `PlanState.status` values are now UPPERCASE (`NONE`, `ACTIVE`, ...). Update any `=== "active"` comparisons.

### Added
- `InactiveState` — new PlanState variant for lapsed subscriptions

### Fixed
- nothing
```

Rules:
- Date is ISO 8601 (`YYYY-MM-DD`)
- Breaking changes get their own subsection with migration guidance
- If nothing changed in a category, omit that subsection

---

## `spec/provider-plan.spec.md` conventions

- Every state variant has its own `###` section
- JSON examples use real-looking values (not `"string"` placeholders)
- All status values are UPPERCASE in examples
- When a field is optional, note it inline: `"deprovisionAt": "..."  // only present when close to expiry`
- Keep the Action slugs table and Action variants table up to date

---

## Adding a new module's docs

1. Create `spec/{module}.spec.md` following the same structure as `spec/provider-plan.spec.md` — endpoints, data shapes, examples
2. Add a `{module}://types` resource to `src/mcp/resources/{module}.ts` that serves the new spec as text
3. Add a link to the new spec in `CONTRIBUTING.md` under "Modules"

---

## Doc structure

```
spec/                           ← living specs, always reflect current state
  {module}.spec.md

docs/                           ← work history, organized by area
  provider-plan-spec/           ← changes to the plan contract
    {feature-name}/
      plan.md                   ← what was built and why
      ACs.md                    ← acceptance criteria
  tooling/                      ← MCP server, deploy, infra
    {feature-name}/
      plan.md
      ACs.md
```

Create `docs/{area}/{feature-name}/plan.md` + `ACs.md` before starting any body of work.

---

## Versioning in docs

`spec/provider-plan.spec.md` carries a `**Version:**` line at the top. Update it to match `package.json` on every release.
