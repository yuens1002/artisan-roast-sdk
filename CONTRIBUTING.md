# Contributing to artisan-roast-sdk

## What this is

`artisan-roast-sdk` is the shared contract library for the Artisan Roast platform ecosystem. It ships two things:

1. **An npm package** — TypeScript types imported by producer and consumer repos
2. **A hosted MCP server** — active contract enforcement via tools and resources, deployed on Railway at `https://sdk.artisanroast.app/mcp`

The SDK defines *shape*, not behaviour. No business logic lives here.

**Producer:** `artisan-roast-platform` — implements `GET /api/plans/resolved` and returns `HydratedPlan[]`
**Consumer:** `ecomm-ai-app` — renders plan cards from `HydratedPlan[]`, no hardcoded strings

---

## Architecture

```
src/
  plans/
    index.ts        ← Plan, HydratedPlan, PlanState, PlanAction types (npm surface)
    validation.ts   ← zod schemas for deep validation
    scaffolds.ts    ← mock + scaffold generators used by MCP tools
  mcp/
    server.ts       ← MCP HTTP server (StreamableHTTPServerTransport)
    tools/
      plans.ts      ← validate_plan_payload, scaffold_plan_state, scaffold_resolved_endpoint
    resources/
      plans.ts      ← plans://types, plans://integration/producer, plans://integration/consumer
  index.ts          ← barrel: re-exports all types

.skills/
  doc.md            ← when + how to update docs
  workflow.md       ← branch → build → version → deploy → notify

docs/
  provider-spec.md  ← full integration guide (producer + consumer)
  plan.md           ← delivery roadmap
  session-N/ACs.md  ← acceptance criteria per session
```

**Personal AI config:** put your tool-specific files (CLAUDE.md, .cursorrules, etc.) in `.ai/` — it is gitignored, no changes to `.gitignore` needed.

---

## Key conventions

### PlanState status values are UPPERCASE

All discriminant values on `PlanState` use UPPERCASE strings:
`NONE`, `ACTIVE`, `TRIAL`, `EXPIRED`, `CANCELLED`, `INACTIVE`

This matches the platform's existing enum conventions and means the store can do `plan.state.status === "TRIAL"` without case coercion.

**Never introduce lowercase status values.** If you see one, it's a bug.

### No business logic

The SDK holds types and zod schemas. Computations, DB queries, and API calls belong in the platform or store.

### One server, grows by module

The MCP server mounts one tool group and one resource group per SDK module. Adding a module means adding `src/mcp/tools/{module}.ts` and `src/mcp/resources/{module}.ts` and mounting them in `src/mcp/server.ts`.

### Skills are LLM-agnostic

`.skills/doc.md` and `.skills/workflow.md` are plain markdown — no tool-specific syntax. Any AI assistant (or human) can follow them.

---

## Setup

```bash
npm install
npm run build       # compile → dist/
npm run typecheck   # type-check only
npm run dev         # run MCP server locally on PORT (default 3100)
```

---

## Making a change

1. Read `.skills/workflow.md` for the full procedure
2. Check `.skills/doc.md` for what docs to update alongside code changes
3. Run `npm run typecheck` before committing — must be clean
4. Run `npm run build` before tagging — verify dist/ is correct

---

## Versioning

Pre-1.0: breaking changes (renamed status literals, changed type shapes, removed exports) → minor bump. Non-breaking additions → patch. See `.skills/workflow.md` for bump steps.

---

## Modules

| Module | Types | MCP tools | Spec |
|--------|-------|-----------|------|
| `plans` | `Plan`, `HydratedPlan`, `PlanState`, `PlanAction` | `validate_plan_payload`, `scaffold_plan_state`, `scaffold_resolved_endpoint` | `docs/provider-spec.md` |

To add a module: follow `.skills/workflow.md` → "Adding a new module".

---

## Consumer repo coordination

After a breaking change, update both consumer repos before tagging:
- `artisan-roast-platform` — update SDK dep, grep for changed literals, run `npm run precheck`
- `ecomm-ai-app` — same

After a patch: no coordination needed. Consumers update at their own pace.
