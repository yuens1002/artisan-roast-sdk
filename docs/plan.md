# artisan-roast-sdk — Delivery Plan

**Status:** ⚪ Planned
**Current version:** 0.1.0
**Target version:** 0.2.0 (breaking — PlanState UPPERCASE) + MCP server

## What we're building

Two things ship together as v0.2.0:

1. **Types update** — `PlanState` status literals change from lowercase to UPPERCASE to match platform enum conventions. Breaking change. `provider-spec.md` updates alongside.
2. **Hosted MCP server** — the SDK becomes active: validate payloads, generate mocks, scaffold implementations. Deployed to Railway. Any LLM-compatible client can point at it.

**Why together:** the MCP tools reference the types. Ship the UPPERCASE convention once, then the MCP tools use it as truth.

---

## Repo structure (target)

```
artisan-roast-sdk/
  src/
    plans/
      index.ts        ← types (existing — UPPERCASE update)
      validation.ts   ← zod schemas for deep validation (NEW)
      scaffolds.ts    ← mock + scaffold generators (NEW)
    mcp/
      server.ts       ← MCP HTTP server entry (NEW)
      tools/
        plans.ts      ← validate_plan_payload, scaffold_plan_state, scaffold_resolved_endpoint
      resources/
        plans.ts      ← plans://types, plans://integration/producer, plans://integration/consumer
    index.ts          ← barrel (existing — no change to surface)
  .skills/
    doc.md            ← documentation procedures (NEW)
    workflow.md       ← development + ship procedures (NEW)
  docs/
    provider-spec.md  ← existing — update status values to UPPERCASE
    plan.md           ← this file
    session-1/ACs.md
    session-2/ACs.md
    session-3/ACs.md
  .gitignore          ← add .ai/, dist/ (NEW)
  .ai/                ← gitignored — each dev's personal AI tool config
  CONTRIBUTING.md     ← architecture, conventions, setup, module guide (NEW)
  CHANGELOG.md        ← existing — add v0.2.0 entry
  railway.toml        ← Railway deploy config (NEW)
  package.json        ← add zod, @modelcontextprotocol/sdk, start script
```

---

## Session breakdown

### Session 1 — Foundations

Establish the UPPERCASE convention, add tooling, commit everything non-MCP.

**Files:**

| File | Change |
|------|--------|
| `src/plans/index.ts` | UPPERCASE all `PlanState` status literals |
| `docs/provider-spec.md` | Update all status value examples to UPPERCASE |
| `package.json` | Bump to 0.2.0; add `zod`, `@modelcontextprotocol/sdk` as deps; add `start` script |
| `.gitignore` | Add `.ai/`, `dist/` |
| `CONTRIBUTING.md` | Architecture overview, key conventions, setup commands, module guide, consumer repo coordination |
| `.skills/doc.md` | When + how to update docs, changelog, and provider-spec on any change |
| `.skills/workflow.md` | Branch → build → version → tag → deploy → notify consumers |
| `CHANGELOG.md` | Add `## [0.2.0]` section with breaking change entry |

**Commit:** `chore: v0.2.0 — PlanState UPPERCASE + repo foundations`

ACs: → `session-1/ACs.md`

---

### Session 2 — MCP Server

Implement the plans module tools and resources. Server runs locally before deploy.

**Files:**

| File | What |
|------|------|
| `src/plans/validation.ts` | Zod schemas matching every type in `index.ts`: `PlanSchema`, `PlanDetailsSchema`, `PlanStateSchema` (discriminated union on UPPERCASE status), `HydratedPlanSchema`, `PlanActionSchema` |
| `src/plans/scaffolds.ts` | `scaffoldPlanState(scenario)` — returns valid `HydratedPlan` for named scenario; `scaffoldResolvedEndpoint()` — returns generic TypeScript implementation starter |
| `src/mcp/tools/plans.ts` | `validate_plan_payload` — validates Plan or HydratedPlan against zod schema, returns structured errors; `scaffold_plan_state` — calls scaffoldPlanState; `scaffold_resolved_endpoint` — calls scaffoldResolvedEndpoint |
| `src/mcp/resources/plans.ts` | `plans://types` → `src/plans/index.ts` as text; `plans://integration/producer` → `docs/provider-spec.md` RESOLVED section; `plans://integration/consumer` → consumer rendering guide |
| `src/mcp/server.ts` | `StreamableHTTPServerTransport` on `process.env.PORT`; mounts all tools + resources |

**Scenarios for `scaffold_plan_state`:**

| Scenario key | Returns |
|---|---|
| `TRIAL_ACTIVE_NO_CARD` | `house-blend-trial` TRIAL, daysRemaining 12/14, Add Billing enabled |
| `TRIAL_ACTIVE_CARD_ADDED` | `house-blend-trial` TRIAL, Extended Trial badge, Add Billing disabled |
| `TRIAL_EXPIRED` | `house-blend-trial` EXPIRED, deprovisionAt set |
| `CONVERTED` | `house-blend` ACTIVE, pools, Manage Billing |
| `SELF_HOSTED_FREE` | `free` ACTIVE, Current Plan badge |
| `SELF_HOSTED_PRIORITY` | `priority-support` ACTIVE, support pools |

**Commit:** `feat: MCP server — plans tools and resources`

ACs: → `session-2/ACs.md`

---

### Session 3 — Railway Deploy + Consumer Registration

Deploy to Railway, wire custom domain, register in consumer repos.

**Steps:**

1. Add `railway.toml` (build + start commands)
2. Create Railway project linked to this GitHub repo
3. Set `PORT` (Railway injects automatically)
4. Configure custom domain: `sdk.artisanroast.app`
5. Add `.mcp.json` to `artisan-roast-platform` root
6. Add `.mcp.json` to `ecomm-ai-app` root
7. Smoke-test: `validate_plan_payload` returns errors for a malformed payload

**MCP registration in consumer repos:**
```json
{
  "mcpServers": {
    "artisan-roast-sdk": {
      "type": "url",
      "url": "https://sdk.artisanroast.app/mcp"
    }
  }
}
```

**Commit:** `chore: Railway deploy config + consumer .mcp.json`

ACs: → `session-3/ACs.md`

---

## Cross-repo context

Full three-stream delivery plan (SDK → platform → store):
`artisan-roast-platform/docs/products/hosted/features/provider-sdk-integration/feature-plan.md`

After SDK v0.2.0 tags:
- Platform `feat/store-api` Session 1 can start
- Store `feat/hosted-store-s2` Session A can start (installs SDK as file dep)
