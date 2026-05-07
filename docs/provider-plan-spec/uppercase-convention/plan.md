# Uppercase Convention + Repo Foundations

**Branch:** `feat/v0.2.0-foundations`
**Version:** v0.2.0 (breaking)
**Produces:** npm package + repo skeleton

---

## What this was

Established the canonical SDK conventions and repo infrastructure before the MCP server was added.

Two breaking changes:

1. **`PlanState` status literals → UPPERCASE** (`"none"` → `"NONE"`, etc.) to match platform enum conventions. Consumers do `plan.state.status === "TRIAL"` with no case coercion.
2. **`zod` + `@modelcontextprotocol/sdk` added** as runtime dependencies — required by validation and the MCP server added in the next session.

Repo foundations added: `.gitignore` (excludes `.ai/` and `dist/`), `CONTRIBUTING.md`, `.skills/doc.md`, `.skills/workflow.md`, `CHANGELOG.md` v0.2.0 section.

---

## Files changed

| File | Change |
|------|--------|
| `src/plans/index.ts` | All status literals → UPPERCASE |
| `docs/provider-spec.md` | All status examples → UPPERCASE |
| `package.json` | Add `zod`, `@modelcontextprotocol/sdk`; version → `0.2.0` |
| `.gitignore` | Add `.ai/`, `dist/` |
| `CONTRIBUTING.md` | New — architecture, conventions, setup |
| `.skills/doc.md` | New — when/how to update docs |
| `.skills/workflow.md` | New — branch → build → version → deploy |
| `CHANGELOG.md` | Add `[0.2.0]` section |
