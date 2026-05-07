# Railway Deploy + Consumer Registration

**Branch:** `feat/railway-deploy`
**Version:** v0.2.2
**Produces:** live MCP server + consumer `.mcp.json` registrations

---

## What this was

Deployed the MCP server to Railway and registered it in consumer repos so Claude Code sessions in `artisan-roast-platform` and `ecomm-ai-app` can call SDK tools without any local setup.

Custom domain `sdk.artisanroast.app` pointed at the Railway service.

---

## Files changed

| File | Change |
|------|--------|
| `railway.toml` | New — build + start commands for Railway |
| `artisan-roast-platform/.mcp.json` | New — registers `artisan-roast-sdk` at `https://sdk.artisanroast.app/mcp` |
| `ecomm-ai-app/.mcp.json` | New — same registration |
