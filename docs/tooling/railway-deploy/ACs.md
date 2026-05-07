# Session 3 — Railway Deploy + Consumer Registration: ACs

**Branch:** `feat/railway-deploy`
**Commit target:** `chore: Railway deploy config + consumer .mcp.json`
**Prerequisite:** Session 2 merged; Railway project created

---

## Infrastructure Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-INF-1 | `railway.toml` present with build + start commands | Code review: `railway.toml` | `build.command` runs `npm run build`; `deploy.startCommand` runs `node dist/mcp/server.js` (or equivalent) | | | |
| AC-INF-2 | Railway auto-deploys on push to `main` | Push a no-op commit to main | Railway dashboard shows a new deployment triggered | | | |
| AC-INF-3 | Deployed server responds at Railway URL | `curl https://<railway-url>/mcp` | HTTP 200 or valid MCP response (not 404, not 502) | | | |
| AC-INF-4 | Custom domain `sdk.artisanroast.app` resolves to Railway | `curl https://sdk.artisanroast.app/mcp` | HTTP 200 or valid MCP response | | | |

---

## Consumer Registration Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-CON-1 | `.mcp.json` added to `artisan-roast-platform` root | Code review: `artisan-roast-platform/.mcp.json` | File present; contains `artisan-roast-sdk` server entry with `url: "https://sdk.artisanroast.app/mcp"` | | | |
| AC-CON-2 | `.mcp.json` added to `ecomm-ai-app` root | Code review: `ecomm-ai-app/.mcp.json` | File present; same entry | | | |
| AC-CON-3 | `validate_plan_payload` callable from platform repo's Claude Code session | Connect Claude Code to platform repo; run tool | Tool returns a response (valid or error) without connection failure | | | |
| AC-CON-4 | `scaffold_plan_state` callable and returns TRIAL scenario | Call with `"TRIAL_ACTIVE_NO_CARD"` from any registered repo | Returns valid HydratedPlan JSON with `state.status: "TRIAL"` | | | |

---

## Smoke Test Acceptance Criteria

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-SMK-1 | Malformed payload returns structured errors | Call `validate_plan_payload` with `{ "slug": "test" }` | Response contains error list; `valid: false` or equivalent | | | |
| AC-SMK-2 | Valid HydratedPlan passes validation | Call `validate_plan_payload` with output of `scaffold_plan_state("CONVERTED")` | `valid: true` | | | |
| AC-SMK-3 | `scaffold_resolved_endpoint` output contains UPPERCASE status references | Call tool; inspect returned string | String contains `"ACTIVE"` or `"TRIAL"` or `"NONE"` — no lowercase status values | | | |
| AC-SMK-4 | Railway deployment survives a restart | Trigger Railway redeploy; wait for healthy | Server responds within 60s of restart; no 502 errors | | | |

---

## Regression

| AC | What | How | Pass | Agent | QC | Reviewer |
|----|------|-----|------|-------|----|----------|
| AC-REG-1 | npm package surface unchanged | Code review: `dist/index.d.ts` | Same exports as Session 2 build | | | |
| AC-REG-2 | MCP tools and resources unchanged from Session 2 | Call `tools/list` and `resources/list` on deployed server | Same 3 tools + 3 resources as Session 2 | | | |
