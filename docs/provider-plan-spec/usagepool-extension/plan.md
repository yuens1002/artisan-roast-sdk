# UsagePool Extension + ProgressBar Removal

**Branch:** `feat/usagepool-extension`
**Version target:** v0.3.3
**Prerequisite:** v0.3.2 (`feat/priority-support-scaffolds`)
**Downstream consumers:** `ecomm-ai-app` — `feat/plan-card-corrections` · `artisan-roast-platform` — `feat/trial-pool-migration`

---

## What changed and why

`ProgressBar` was a parallel type modelling time-limited resources (trial days remaining). `UsagePool` already models any consumable resource. The two types were structurally identical under different field names — creating duplicate construction paths in the platform, duplicate renderers in the store, and two schemas to keep in sync.

This work resolves the inconsistency:

1. **Remove `ProgressBar`** — `TrialState.progress` and `ExpiredState.progress` become `pools: UsagePool[]`. A trial's time resource is just another pool (`slug: "trial-days"`).
2. **Extend `UsagePool`** — add `icon?: string` (Lucide icon name before the label) and `countLabel?: string` (unit suffix rendered as `{used} / {limit} {countLabel}`). Consumers provide only the divider and spaces.
3. **Correct scaffolds** — update all affected scenarios to the unified shape; fix data gaps found during consumer integration testing.

---

## Type changes

### Remove `ProgressBar`

`ProgressBar` is retired. `TrialState` and `ExpiredState` now use `pools: UsagePool[]`.

| Before | After |
|--------|-------|
| `TrialState.progress: ProgressBar` | `TrialState.pools: UsagePool[]` |
| `ExpiredState.progress: ProgressBar` | `ExpiredState.pools: UsagePool[]` |

The trial-days pool shape: `{ slug: "trial-days", icon: "clock", label: "Trial remaining", countLabel: "days", used: <elapsed>, limit: <total> }`.

### Extend `UsagePool`

```typescript
interface UsagePool {
  // ... existing fields (slug, label, limit, used, purchased?, cta?) ...
  /** Lucide icon name rendered before the pool label */
  icon?: string;
  /** Unit suffix — consumers render "{used} / {limit} {countLabel}" (e.g. "used", "days") */
  countLabel?: string;
}
```

Consumers hardcode only the spaces and `/` divider. The platform provides all content.

---

## Scaffold corrections

| Scenario | Change |
|----------|--------|
| `SELF_HOSTED_FREE` | `description` → `"Self hosted with community support"` |
| `SELF_HOSTED_FREE_WITH_ADDONS` | Add `icon` + `countLabel` to both pools |
| `PRIORITY_SUPPORT_ACTIVE` | Add `icon` + `countLabel` to both pools |
| `TRIAL_ACTIVE_NO_CARD` | Replace `progress` with `pools: [trial-days pool]` |
| `TRIAL_ACTIVE_CARD_ADDED` | Same pools; actions: `cancel-trial` only — remove `add-billing` |
| `TRIAL_EXPIRED` | Same pools with `used === limit`; `statusInfo.descText` set; actions: `extend-trial` (primary, placeholder URL) + `end-trial` (ghost) |
| `CONVERTED` | Add `state.actions`: manage-billing |
| `DIRECT_SUBSCRIBE` | Add `state.actions`: manage-billing |
| `INACTIVE` | Ensure `plan.details.benefits.inactiveItems` populated; `deactivatedAt` ~30 days prior |

> **Extend Trial URL**: placeholder `https://buy.stripe.com/PLACEHOLDER_EXTEND_TRIAL` — Stripe product creation is a pre-launch blocker.

---

## Files changed

| File | Change |
|------|--------|
| `src/plans/index.ts` | Remove `ProgressBar`; add `icon?` + `countLabel?` to `UsagePool`; update `TrialState` + `ExpiredState` |
| `src/plans/validation.ts` | Remove `ProgressBarSchema`; update `UsagePoolSchema`, `TrialStateSchema`, `ExpiredStateSchema` |
| `src/plans/scaffolds.ts` | All scenario corrections per table above |

---

## Consumer migration

| Repo | What to update |
|------|----------------|
| `artisan-roast-platform` | Grep `progress:`, `daysRemaining`, `daysLimit` in state builders; replace with `pools:` — see `feat/trial-pool-migration` |
| `ecomm-ai-app` | Remove `ProgressBar` renderer; render trial pools identically to active pools — see `feat/plan-card-corrections` |

---

## Commit schedule

1. `feat(plans): replace ProgressBar with UsagePool on trial/expired states; add icon + countLabel`
2. `feat(plans): scaffold corrections for all affected scenarios`
3. `chore: bump to v0.3.3`
