# Release Skill — artisan-roast-sdk

Every code change to this SDK ships through this flow. No exceptions.

**Bump level:** default `patch`. Pass `minor` or `major` as the argument if the change warrants it.

---

## Step 1: Confirm clean state

```bash
git status
npm test
```

Both must be clean (no unstaged changes, all tests green) before proceeding. If not, stop and tell the user what needs fixing.

---

## Step 2: Push branch and open PR

If the current branch is not `master`, push it and open a PR:

```bash
git push -u origin <branch>
gh pr create --title "<title>" --body "<body>"
```

PR body must include:
1. **Summary** — bullet list of what changed
2. **Test plan** — checklist (tests passing, type-check clean)

If a PR for this branch is already open, skip creation — note the existing PR number.

---

## Step 3: Poll for Copilot review (every 2 minutes, up to 10 minutes)

```bash
for i in 1 2 3 4 5; do
  REVIEW=$(gh pr view <number> --json reviews --jq '[.reviews[] | select(.author.login == "copilot-pull-request-reviewer")] | length')
  if [ "$REVIEW" -gt "0" ]; then echo "Copilot reviewed"; break; fi
  echo "Waiting for Copilot review… attempt $i/5"
  sleep 120
done
```

If no review after 10 minutes, tell the user: "Copilot hasn't reviewed yet — request it manually from the PR page (Reviewers → Copilot) then re-invoke `/release`."

---

## Step 4: Fetch and address inline comments

> **IMPORTANT:** `gh pr view --comments` does NOT return inline review comments. Always use the API:

```bash
gh api repos/yuens1002/artisan-roast-sdk/pulls/<number>/comments
```

For each inline comment:
- Read the affected file
- Apply the fix if valid; note with reasoning if intentionally skipping
- Do not blindly apply suggestions — use judgment
- Stage **only** files that address a specific comment (no unrelated changes)
- Commit: `fix(review): address copilot review comments`
- Push to the same branch

If there are no inline comments, proceed directly to Step 5.

---

## Step 5: Resolve all review threads

Fetch thread IDs:

```bash
gh api graphql -f query='{ repository(owner: "yuens1002", name: "artisan-roast-sdk") { pullRequest(number: <N>) { reviewThreads(first: 50) { nodes { id isResolved } } } } }'
```

Resolve each unresolved thread:

```bash
gh api graphql -f query='mutation { resolveReviewThread(input: {threadId: "<THREAD_ID>"}) { thread { isResolved } } }'
```

---

## Step 6: Squash merge and delete branch

```bash
gh pr merge <number> --squash --delete-branch
git checkout master && git pull
```

---

## Step 7: Bump version

Determine the new version based on the bump level (default: `patch`):

```bash
npm version patch --no-git-tag-version   # or minor / major
```

Note the new version string (e.g. `0.6.3`).

---

## Step 8: Update CHANGELOG.md

Prepend a new versioned section above the previous release:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Fixed / Added / Changed
- <summary of changes from the merged PR>
```

Also update the comparison links at the bottom of CHANGELOG.md:

```markdown
[Unreleased]: https://github.com/yuens1002/artisan-roast-sdk/compare/vX.Y.Z...HEAD
[X.Y.Z]: https://github.com/yuens1002/artisan-roast-sdk/compare/vPREV...vX.Y.Z
```

---

## Step 9: Commit, tag, and push

```bash
git add package.json CHANGELOG.md
git commit -m "chore: release vX.Y.Z"
git tag vX.Y.Z
git push
git push --tags
```

---

## Step 10: Confirm

Report:
- PR number merged
- Version bumped: old → new
- Tag pushed: `vX.Y.Z`
- Any Copilot comments addressed (or "none")
