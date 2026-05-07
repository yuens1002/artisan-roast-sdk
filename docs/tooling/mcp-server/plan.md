# MCP Server

**Branch:** `feat/mcp-plans`
**Version:** v0.2.1
**Produces:** hosted MCP server at `https://sdk.artisanroast.app/mcp`

---

## What this was

Added the hosted MCP server — making the SDK active. Any LLM-compatible client pointed at `sdk.artisanroast.app/mcp` can validate payloads, generate scaffolds, and read the integration spec without leaving their editor.

Three tools:

- `validate_plan_payload` — validates any Plan or HydratedPlan against the zod schema; returns structured errors
- `scaffold_plan_state` — returns a named scenario from `SCENARIOS` as ready-to-use JSON
- `scaffold_resolved_endpoint` — returns a TypeScript implementation stub for `GET /api/plans/resolved`

Three resources:

- `plans://types` — the full TypeScript source of `src/plans/index.ts`
- `plans://integration/producer` — the provider spec (what to implement)
- `plans://integration/consumer` — the consumer guide (how to render)

---

## Files changed

| File | Change |
|------|--------|
| `src/plans/validation.ts` | New — zod schemas for all types |
| `src/plans/scaffolds.ts` | New — `SCENARIOS` map + `SCENARIO_KEYS` |
| `src/mcp/server.ts` | New — `StreamableHTTPServerTransport` entry |
| `src/mcp/tools/plans.ts` | New — three plan tools |
| `src/mcp/resources/plans.ts` | New — three plan resources |
| `src/index.ts` | Re-export `SCENARIOS`, `SCENARIO_KEYS` |
| `package.json` | Add `start` script; version → `0.2.1` |
