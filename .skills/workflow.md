# Workflow Skill

How to develop, version, build, and ship changes to `artisan-roast-sdk`.

---

## Development setup

```bash
npm install
npm run build     # compile src/ → dist/
npm run typecheck # type-check without emit
npm run dev       # run MCP server locally on PORT (default 3100)
```

Local MCP server: `http://localhost:3100/mcp`

To test against a local SDK change from a consumer repo before tagging, install as a file dep:
```bash
# From ecomm-ai-app or artisan-roast-platform:
npm install ../../artisan-roast-sdk
```

---

## Branch naming

```
feat/{short-description}   # new feature or module
fix/{short-description}    # bug fix
chore/{short-description}  # tooling, deps, config
docs/{short-description}   # docs-only
```

---

## Making a change

1. Create a feature branch from `master`
2. Edit `src/` — never edit `dist/` directly
3. Run `npm run typecheck` — must pass before any commit
4. Follow `.skills/doc.md` for what else to update
5. Run `npm run build` — verify dist/ builds clean
6. Commit with conventional message: `feat:`, `fix:`, `chore:`, `docs:`
7. Open a PR against `master`; merge when ready
8. Railway auto-deploys on merge to `master`

---

## Versioning rules (pre-1.0)

| Change type | Bump |
|---|---|
| Breaking: status literal rename, type shape change, removed export | **minor** (0.1.x → 0.2.0) |
| Addition: new optional field, new state variant, new module | **patch** (0.2.0 → 0.2.1) |
| Docs/tooling only | no bump |

After 1.0: follow semver strictly (breaking → major).

**Bump steps (on the feature branch, before opening the PR):**
1. Update `"version"` in `package.json`
2. Add section to `CHANGELOG.md` (see `.skills/doc.md`)
3. Run `npm run build`
4. Commit: `chore: bump to vX.Y.Z`
5. Open PR, merge to `master`
6. Tag on `master` after merge: `git tag vX.Y.Z && git push --tags`

---

## Shipping (Railway deploy)

Railway auto-deploys on every merge to `master` (GitHub source connected, auto-deploy enabled). No manual deploy step needed.

To verify the deployed version:
```bash
curl https://sdk.artisanroast.app/health
# {"status":"ok","version":"X.Y.Z"}
```

If the deploy fails: check Railway dashboard for build logs. Common causes: `tsc` error, missing env var, `package.json` start script misconfigured.

---

## Notifying consumer repos

After any breaking change (minor bump pre-1.0):

1. `artisan-roast-platform` — update the `artisan-roast-sdk` version in `package.json`; grep for changed status literals; run `npm run precheck`
2. `ecomm-ai-app` — same steps
3. Note the breaking change in both repos' PRs

After a patch (non-breaking): consumer repos can update at their own pace. No notification required.

---

## Adding a new module

1. Create `src/{module}/index.ts` — types only, no business logic
2. Re-export from `src/index.ts`
3. Create `src/{module}/validation.ts` — zod schemas
4. Create `src/{module}/scaffolds.ts` — mock generators
5. Create `src/mcp/tools/{module}.ts` — MCP tools
6. Create `src/mcp/resources/{module}.ts` — MCP resources; mount in `src/mcp/server.ts`
7. Create `docs/{module}-spec.md`
8. Follow `.skills/doc.md` for changelog + versioning
