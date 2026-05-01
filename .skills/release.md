# Release Skill

Automates the version bump, build verification, and PR workflow for `artisan-roast-sdk`. Run this after feature work is committed and ready for review.

---

## Arguments

- `patch` — non-breaking addition (new optional field, new state variant, new module)
- `minor` — breaking change pre-1.0 (renamed field, type shape change, removed export, changed status literal)

After 1.0: follow semver strictly — breaking → major.

---

## Step 1 — Assess the change type

```bash
git log master..HEAD --oneline
```

Review what's on the branch. Determine bump type using the rules:

| Change | Bump |
|--------|------|
| Renamed field, changed required type shape, removed export | `minor` |
| New optional field, new state variant, new export | `patch` |
| Docs or tooling only | no bump |

If bump type is wrong (e.g. a breaking change was called a patch), correct it before proceeding.

---

## Step 2 — Verify types and build

```bash
npm run typecheck   # must be clean — zero errors
npm run build       # must succeed — verifies dist/ compiles
```

Stop if either fails. Fix the issue and re-run before continuing.

---

## Step 3 — Determine next version

```bash
git tag -l 'v*' --sort=-version:refname | head -1
# e.g. v0.2.0
node -p "require('./package.json').version"
# e.g. 0.2.0
```

Tags are the source of truth. Compute next version from the latest tag, not `package.json` (they may have drifted).

- `patch`: `0.2.0` → `0.2.1`
- `minor`: `0.2.0` → `0.3.0`

---

## Step 4 — Bump `package.json`

Edit `"version"` in `package.json` to the new version.

---

## Step 5 — Update `CHANGELOG.md`

Add a new section above the previous release. Follow the format exactly:

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Breaking Changes
- Description + migration guidance (minor bumps only)

### Added
- New fields, variants, or exports

### Fixed
- Bug fixes
```

Omit any subsection that has nothing to list.

---

## Step 6 — Commit the bump (separate from feature commit)

```bash
git add package.json CHANGELOG.md
git commit -m "chore: bump to vX.Y.Z"
```

This must be a standalone commit — do not mix feature changes into the bump commit.

---

## Step 7 — Open the PR

```bash
gh pr create --title "..." --body "..."
```

PR title should describe the feature, not the version. Include in the body:
- What changed and why
- Migration guide for breaking changes (minor bumps)
- Test plan checklist

---

## Step 8 — Wait for Copilot review

Do not merge until a Copilot review appears. Check with:

```bash
gh pr view <number> --json reviews
```

---

## Step 9 — Address review comments

For every inline comment:
- Apply the fix in code **or** reply explaining why it was declined
- Explicitly resolve the thread via GitHub UI or GraphQL mutation

A reply alone is not enough — threads must be resolved.

---

## Step 10 — Merge

Once all threads are resolved:

```bash
gh pr merge <number> --squash   # or --merge, per repo convention
```

---

## Step 11 — Tag on master after merge

```bash
git checkout master && git pull
git tag vX.Y.Z && git push --tags
```

Verify Railway auto-deployed the new version:

```bash
curl https://sdk.artisanroast.app/health
# {"status":"ok","version":"X.Y.Z"}
```

---

## Step 12 — Notify consumer repos (breaking changes only)

For `minor` bumps, open follow-up PRs in both consumer repos:

1. `artisan-roast-platform` — bump SDK dep in `package.json`; grep for changed literals/fields; run `npm run precheck`
2. `ecomm-ai-app` — same steps

For `patch` bumps: no action needed. Consumer repos update at their own pace.
