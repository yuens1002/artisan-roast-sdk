# Session 4 — Plan Card Shape Spec

**Version target:** v0.3.0 (minor bump — breaking changes)
**Branch:** `feat/plan-card-shape` (stacked on `feat/action-modals`, rebase onto `master` after v0.2.1 merges)
**Source:** Plan card UI audit against seed data and SDK types, 2026-05-01

---

## Design principles confirmed

- All copy (descriptions, labels, CTAs, status text, benefit items) comes from the payload — no hardcoded strings in the store
- Platform constructs full sentences server-side (e.g. `statusInfo.descText`) before sending payload
- `state.badge` + `state.badgeIcon` drive the plan status badge — no duplication in `statusInfo`
- Component controls styling (icon color, layout) — payload drives content only
- Benefit item icons hardcoded in component (green check) — not a payload field

---

## Breaking changes

### 1. New type: `BenefitsBlock`

Replaces `Plan.details.benefits: string[]`.

```typescript
interface BenefitsBlock {
  activeHeader?: string;     // shown in all non-inactive states
  activeItems: string[];     // 50 char max per item
  inactiveHeader?: string;   // e.g. "Renew to get back:" — shown in INACTIVE state
  inactiveItems?: string[];  // falls back to activeItems if absent; 50 char max per item
}
```

**Store logic:**
```typescript
const items = state.status === "INACTIVE" && block.inactiveItems
  ? block.inactiveItems
  : block.activeItems;
const header = state.status === "INACTIVE"
  ? block.inactiveHeader
  : block.activeHeader;
```

**Migration:** `Plan.details.benefits: string[]` → `Plan.details.benefits: BenefitsBlock`

---

### 2. New type: `ProgressBar`

Replaces `daysRemaining` + `daysLimit` on `TrialState` and `ExpiredState`.

```typescript
interface ProgressBar {
  icon: string;         // separate from badgeIcon — e.g. "clock"
  label: string;        // e.g. "Trial days"
  value: number;        // first number shown (e.g. 0 remaining)
  total: number;        // second number shown (e.g. 14 total)
  countLabel: string;   // e.g. "remaining" | "used"
}
// Rendered as: "{icon} {label}   {value} / {total} {countLabel}"
```

**Migration:** `TrialState.daysRemaining` + `TrialState.daysLimit` → `TrialState.progress: ProgressBar`
Same for `ExpiredState`.

---

### 3. New type: `StatusInfo`

Optional secondary description line below the badge. State-computed — platform builds the full string at payload time.

```typescript
interface StatusInfo {
  descIcon?: string;   // lucide icon name
  descText?: string;   // full sentence, e.g. "Trial ended. Store will be removed on May 13, 2026."
}
```

**Migration:**
- `ActiveState.renewalDate?: string` → `ActiveState.statusInfo?: StatusInfo`
- `statusInfo` added as optional to: `TrialState`, `ExpiredState`, `CancelledState`, `InactiveState`
- `NoneState` — no `statusInfo` (nothing to report)

---

### 4. `PlanAction` icon split

```typescript
// Before
icon?: string;

// After
iconBefore?: string;
iconAfter?: string;
```

Any CTA can have icons on either or both sides. Behavior (`url` / `endpoint` / `modalSlug`) is orthogonal to icon placement.

---

### 5. `InactiveState` — `previousFeatures` removed, `badgeIcon` added

```typescript
// Before
export interface InactiveState {
  status: "INACTIVE";
  badge: string;
  deactivatedAt: string;
  previousFeatures: string[];   // ← slugs only, unusable by store
  actions: PlanAction[];
}

// After
export interface InactiveState {
  status: "INACTIVE";
  badge: string;
  badgeIcon?: string;           // ← added (was missing from this state only)
  deactivatedAt: string;
  statusInfo?: StatusInfo;      // ← added
  actions: PlanAction[];
  // previousFeatures removed — comeback copy now lives in Plan.details.benefits.inactiveItems
}
```

---

### 6. `ActiveState` — `renewalDate` removed

```typescript
// Before
renewalDate?: string;

// After
statusInfo?: StatusInfo;   // { descIcon: "rotate-cw", descText: "Renews on May 28, 2026" }
```

---

### 7. `TrialState` and `ExpiredState` — progress bar + statusInfo

```typescript
// Before (both states)
daysRemaining: number;
daysLimit: number;
deprovisionAt?: string;

// After (both states)
progress: ProgressBar;
deprovisionAt?: string;    // kept — used by platform to compute statusInfo.descText
statusInfo?: StatusInfo;   // e.g. { descText: "Trial ended. Store will be removed on May 13, 2026." }
```

---

### 8. `CancelledState` — `statusInfo` added

```typescript
statusInfo?: StatusInfo;   // e.g. { descText: "Cancellation scheduled. Access ends May 13, 2026." }
```

---

## Zod schema updates

All new types need corresponding Zod schemas in `src/plans/validation.ts`:
- `BenefitsBlockSchema`
- `ProgressBarSchema`
- `StatusInfoSchema`
- `PlanActionSchema`: rename `icon` → `iconBefore` + `iconAfter`
- Each state schema updated to match type changes above
- `PlanDetailsSchema`: `benefits: z.array(z.string())` → `benefits: BenefitsBlockSchema`

---

## Scaffold updates (`src/plans/scaffolds.ts`)

All `SCENARIOS` must be updated to use the new shapes:
- `cancelModal` object → `actionModals[]` already done in v0.2.1
- `daysRemaining`/`daysLimit` → `progress: ProgressBar` objects
- `renewalDate` → `statusInfo`
- `previousFeatures` → remove; ensure `Plan.details.benefits` has `inactiveItems`
- `icon` on actions → split to `iconBefore`/`iconAfter`
- Benefit strings → `BenefitsBlock` objects with `activeItems`/`inactiveItems`

---

## Provider spec updates (`docs/provider-spec.md`)

- Bump version to `0.3.0`
- Update all state variant examples with new field shapes
- Add `BenefitsBlock`, `ProgressBar`, `StatusInfo` sections
- Update `PlanAction` section (icon split)
- Remove `previousFeatures` from `InactiveState` example

---

## Versioning

**v0.3.0** — minor bump pre-1.0 (breaking type shape changes):
- Removed fields: `daysRemaining`, `daysLimit`, `renewalDate`, `previousFeatures`, `PlanAction.icon`
- Renamed fields: none (icon → iconBefore/iconAfter is a split, not a rename)
- New required fields on existing types: `ProgressBar` on `TrialState`/`ExpiredState`
- New types: `BenefitsBlock`, `ProgressBar`, `StatusInfo`

**Consumer migration checklist:**
- `artisan-roast-platform` — update SDK dep, grep for `daysRemaining`, `daysLimit`, `renewalDate`, `previousFeatures`, `action.icon`; update seed shapes; run `npm run precheck`
- `ecomm-ai-app` — same grep + update plan card component bindings

---

## Release checklist (follow `.skills/release.md`)

- [ ] All types updated in `src/plans/index.ts`
- [ ] Zod schemas updated in `src/plans/validation.ts`
- [ ] Scaffolds updated in `src/plans/scaffolds.ts`
- [ ] MCP resource descriptions updated in `src/mcp/resources/plans.ts`
- [ ] `docs/provider-spec.md` updated + version bumped to `0.3.0`
- [ ] `npm run typecheck` clean
- [ ] `npm run build` clean
- [ ] `CHANGELOG.md` updated with migration guidance
- [ ] `package.json` bumped to `0.3.0`
- [ ] Separate bump commit: `chore: bump to v0.3.0`
- [ ] PR opened, Copilot reviewed, threads resolved
- [ ] Merged + tagged `v0.3.0` on master
- [ ] Railway health check: `curl https://sdk.artisanroast.app/health`
- [ ] Consumer repo PRs opened (platform + store)
