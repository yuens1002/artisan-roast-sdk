# Documentation Skill

How to keep SDK docs in sync with code changes. Follow this any time you modify a type, add a module, or change a contract.

---

## When to update what

| Change | Files to update |
|--------|----------------|
| Add or rename a type field | `src/{module}/index.ts` + `docs/provider-spec.md` + `CHANGELOG.md` |
| Change a status literal | Same as above — also grep consumer repos for the old value |
| Add a new state variant | `src/plans/index.ts` + `docs/provider-spec.md` (new variant section) + `src/plans/validation.ts` (new zod branch) + `src/mcp/tools/plans.ts` (new scaffold scenario) |
| Add a new module | New `src/{module}/index.ts` + new `docs/{module}-spec.md` + new `src/mcp/tools/{module}.ts` + new `src/mcp/resources/{module}.ts` + re-export in `src/index.ts` |
| Breaking change | All of the above + `CHANGELOG.md` major/minor bump section + notify consumer repos |

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

## `provider-spec.md` conventions

- Every state variant has its own `###` section
- JSON examples use real-looking values (not `"string"` placeholders)
- All status values are UPPERCASE in examples
- When a field is optional, note it inline: `"deprovisionAt": "..."  // only present when close to expiry`
- Keep the Action slugs table and Action variants table up to date

---

## Adding a new module's docs

1. Create `docs/{module}-spec.md` following the same structure as `docs/provider-spec.md` — endpoints, data shapes, examples
2. Add a `{module}://types` resource to `src/mcp/resources/{module}.ts` that serves the new spec as text
3. Add a link to the new spec in `CONTRIBUTING.md` under "Modules"

---

## Versioning in docs

`docs/provider-spec.md` carries a `**Version:**` line at the top. Update it to match `package.json` on every release.
