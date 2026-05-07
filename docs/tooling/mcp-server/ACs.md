# Session 2 — MCP Server: ACs

**Branch:** `feat/mcp-plans`
**Commit target:** `feat: MCP server — plans tools and resources`
**Prerequisite:** Session 1 merged

---

## Functional Acceptance Criteria — Tools

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-1 | `validate_plan_payload` accepts a valid `Plan` | Run MCP tool call with a conforming Plan JSON | Returns `{ valid: true }` or equivalent success shape | | | |
| AC-FN-2 | `validate_plan_payload` rejects a Plan missing required fields | Run MCP tool call with `{ slug: "x" }` (missing name, price, etc.) | Returns structured errors listing missing fields | | | |
| AC-FN-3 | `validate_plan_payload` accepts a valid `HydratedPlan` with `ACTIVE` state | Run MCP tool call with a conforming HydratedPlan | Returns success | | | |
| AC-FN-4 | `validate_plan_payload` rejects a `HydratedPlan` with lowercase `"active"` status | Run MCP tool call with `state.status: "active"` | Returns error: status must be UPPERCASE | | | |
| AC-FN-5 | `validate_plan_payload` rejects unknown status value | Run MCP tool call with `state.status: "PENDING"` | Returns error: not a valid PlanState status | | | |
| AC-FN-6 | `scaffold_plan_state` returns valid HydratedPlan for `TRIAL_ACTIVE_NO_CARD` | Run MCP tool call with scenario `"TRIAL_ACTIVE_NO_CARD"` | Returns JSON with `state.status: "TRIAL"`, `daysRemaining: number`, at least one action with `slug: "add-billing"` | | | |
| AC-FN-7 | `scaffold_plan_state` returns valid HydratedPlan for `CONVERTED` | Run MCP tool call with scenario `"CONVERTED"` | Returns JSON with `state.status: "ACTIVE"`, `state.pools` non-empty, action with `slug: "manage-billing"` | | | |
| AC-FN-8 | `scaffold_plan_state` returns valid HydratedPlan for `SELF_HOSTED_FREE` | Run MCP tool call with scenario `"SELF_HOSTED_FREE"` | Returns JSON with `state.status: "ACTIVE"`, `state.badge: "Current Plan"`, visibility `"self-hosted"` | | | |
| AC-FN-9 | `scaffold_plan_state` returns an error for unknown scenario | Run MCP tool call with scenario `"DOES_NOT_EXIST"` | Returns error listing valid scenario keys | | | |
| AC-FN-10 | `scaffold_resolved_endpoint` returns a valid TypeScript string | Run MCP tool call | Returns non-empty string containing `GET`, `HydratedPlan`, and `Bearer` | | | |
| AC-FN-11 | All scaffolded HydratedPlan outputs pass `validate_plan_payload` | Run each scenario through scaffold, then validate | 0 validation errors on any built-in scenario | | | |

---

## Functional Acceptance Criteria — Resources

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-FN-12 | `plans://types` resource returns TypeScript source | Fetch resource | Content contains `export interface Plan`, `export type PlanState`, `export interface HydratedPlan` | | | |
| AC-FN-13 | `plans://integration/producer` resource returns provider-spec content | Fetch resource | Content contains `GET /api/plans/resolved` and `HydratedPlan` | | | |
| AC-FN-14 | `plans://integration/consumer` resource returns consumer guide content | Fetch resource | Content contains `plan.state.status` and describes dispatch pattern | | | |

---

## Server Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-SRV-1 | Server starts on `PORT` env var | Run: `PORT=3100 npm run dev` | No startup errors; process listens on 3100 | | | |
| AC-SRV-2 | MCP endpoint responds to initialize | Send MCP initialize request to `http://localhost:3100/mcp` | Returns valid MCP server capabilities response | | | |
| AC-SRV-3 | Tools list includes all three plan tools | Call `tools/list` | `validate_plan_payload`, `scaffold_plan_state`, `scaffold_resolved_endpoint` all appear | | | |
| AC-SRV-4 | Resources list includes all three plan resources | Call `resources/list` | `plans://types`, `plans://integration/producer`, `plans://integration/consumer` all appear | | | |

---

## Build Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-BLD-1 | TypeScript compiles clean including MCP files | Run: `npm run typecheck` | 0 errors | | | |
| AC-BLD-2 | `dist/mcp/server.js` present after build | Run: `npm run build` | File exists at `dist/mcp/server.js` | | | |

---

## Regression

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-REG-1 | Existing type exports unchanged | Code review: `dist/index.d.ts` | Same exports as Session 1 build — no types removed | | | |
| AC-REG-2 | `validate_plan_payload` validation schemas match `index.ts` types | Code review: `src/plans/validation.ts` vs `src/plans/index.ts` | Every field in every exported interface has a corresponding zod schema field | | | |
