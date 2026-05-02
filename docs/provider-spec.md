# Provider Spec — artisan-roast-sdk

**Version:** 0.3.0

Implement these two endpoints and your plans will render in any Artisan Roast store. The store has no slug-specific logic — it renders whatever your payload says.

---

## Endpoints

### `GET /api/plans`

Public. No authentication. Cacheable (recommend 24h).

Returns static plan definitions — pricing, details, visibility. Used by marketing pages and plan detail routes.

**Response: `PlansResponse`**

```json
{
  "plans": [
    {
      "slug": "my-plan",
      "name": "My Plan",
      "description": "A short tagline",
      "price": 2900,
      "currency": "USD",
      "interval": "month",
      "features": ["my-feature"],
      "details": {
        "benefits": {
          "activeItems": ["Feature one", "Feature two"]
        },
        "terms": ["Billed monthly, cancel anytime"]
      },
      "highlight": false,
      "visibility": "self-hosted"
    }
  ]
}
```

---

### `GET /api/plans/resolved`

Authenticated. Bearer license key. Short cache (~60s — the store polls this).

Returns the same plans filtered and hydrated for the requesting instance. Each plan carries a computed `state` field — the store renders directly from this, no merging required.

**Request header:**
```
Authorization: Bearer <license-key>
```

**Response: `ResolvedPlansResponse`**

```json
{
  "resolvedAt": "2026-04-30T00:00:00Z",
  "plans": [ /* HydratedPlan[] — see state variants below */ ]
}
```

---

## Visibility

Controls which build mode renders a plan card.

| Value | Shown to |
|-------|----------|
| `"self-hosted"` | Instances without a hosted license |
| `"hosted"` | Instances with an active hosted license or trial |

---

## `BenefitsBlock`

`plan.details.benefits` is a `BenefitsBlock`, not a plain string array. The store selects items based on `state.status`:

```typescript
interface BenefitsBlock {
  activeHeader?: string;    // heading for active/trial/expired states
  activeItems: string[];    // 50 char max per item
  inactiveHeader?: string;  // e.g. "Renew to get back:"
  inactiveItems?: string[]; // falls back to activeItems if absent; 50 char max
}
```

**Store dispatch:**
```typescript
const items = state.status === "INACTIVE" && block.inactiveItems
  ? block.inactiveItems
  : block.activeItems;
const header = state.status === "INACTIVE" ? block.inactiveHeader : block.activeHeader;
```

Item icons (green check) are hardcoded in the component — not a payload field.

---

## `ProgressBar`

Used on `TrialState` and `ExpiredState` in place of raw `daysRemaining`/`daysLimit` values. Platform computes all values server-side.

```typescript
interface ProgressBar {
  icon: string;       // Lucide icon name (e.g. "clock")
  label: string;      // e.g. "Trial days"
  value: number;      // current value (e.g. 10 remaining)
  total: number;      // maximum (e.g. 14 total)
  countLabel: string; // e.g. "remaining" | "used"
}
```

Rendered as: `{icon} {label}   {value} / {total} {countLabel}`

---

## `StatusInfo`

Optional secondary description line below the badge, available on all states except `NONE`. Platform builds the full sentence server-side — the store renders it verbatim.

```typescript
interface StatusInfo {
  descIcon?: string; // Lucide icon name (e.g. "rotate-cw", "alert-circle")
  descText?: string; // full sentence (e.g. "Renews on May 28, 2026.")
}
```

---

## State variants

Each `HydratedPlan` has a `state` field. The `status` discriminant tells the store which layout to render.

### `NONE` — not subscribed

Show pricing and a subscribe CTA.

```json
{
  "state": {
    "status": "NONE",
    "actions": [
      { "slug": "subscribe", "label": "Subscribe Now", "url": "https://buy.stripe.com/..." }
    ]
  }
}
```

---

### `ACTIVE` — active subscription

Show badge, `statusInfo` (renewal date), usage pools, and management CTA.

```json
{
  "state": {
    "status": "ACTIVE",
    "badge": "Active",
    "badgeIcon": "check-circle-2",
    "statusInfo": {
      "descIcon": "rotate-cw",
      "descText": "Renews on May 30, 2026."
    },
    "pools": [
      { "slug": "tickets", "label": "Priority Tickets", "limit": 5, "used": 2 }
    ],
    "actions": [
      {
        "slug": "manage-billing",
        "label": "Manage Billing",
        "endpoint": "/api/billing/portal",
        "iconAfter": "external-link",
        "variant": "secondary"
      }
    ]
  }
}
```

---

### `TRIAL` — active time-bounded trial

Show a progress bar and billing CTA.

```json
{
  "state": {
    "status": "TRIAL",
    "badge": "Active Trial",
    "badgeIcon": "clock",
    "progress": {
      "icon": "clock",
      "label": "Trial days",
      "value": 10,
      "total": 14,
      "countLabel": "remaining"
    },
    "actions": [
      { "slug": "add-billing", "label": "Add Billing", "url": "https://buy.stripe.com/...", "variant": "primary" },
      { "slug": "cancel", "label": "Cancel Trial", "variant": "ghost", "modalSlug": "cancel-trial" }
    ]
  }
}
```

When billing has been added and the trial is extended to 30 days, return `badge: "Extended Trial"` and `progress.total: 30`. To disable `add-billing` once billing is on file:

```json
{ "slug": "add-billing", "label": "Add Billing", "url": "...", "disabled": true, "disabledReason": "Billing already on file" }
```

---

### `EXPIRED` — grace period before deprovision

Show the progress bar at zero, `statusInfo` with deprovision date, and a subscribe CTA.

```json
{
  "state": {
    "status": "EXPIRED",
    "badge": "Expired",
    "badgeIcon": "clock",
    "progress": {
      "icon": "clock",
      "label": "Trial days",
      "value": 0,
      "total": 14,
      "countLabel": "remaining"
    },
    "deprovisionAt": "2026-05-14T00:00:00Z",
    "statusInfo": {
      "descIcon": "alert-circle",
      "descText": "Trial ended. Store will be removed on May 14, 2026."
    },
    "actions": [
      { "slug": "subscribe", "label": "Subscribe Now", "url": "https://buy.stripe.com/...", "variant": "primary" }
    ]
  }
}
```

---

### `CANCELLED` — subscription cancelled, reactivation window open

Show a countdown to deprovision and a reactivate CTA.

```json
{
  "state": {
    "status": "CANCELLED",
    "badge": "Cancellation Pending",
    "daysRemaining": 12,
    "daysLimit": 14,
    "deprovisionAt": "2026-05-14T00:00:00Z",
    "statusInfo": {
      "descText": "Cancellation scheduled. Access ends May 14, 2026."
    },
    "actions": [
      { "slug": "reactivate", "label": "Reactivate", "url": "https://buy.stripe.com/...", "variant": "primary" }
    ]
  }
}
```

---

### `INACTIVE` — lapsed subscription

Show deactivation date, `statusInfo`, comeback benefits (`inactiveItems`), and a renew CTA. Comeback copy lives in `plan.details.benefits.inactiveItems` — not in state.

```json
{
  "state": {
    "status": "INACTIVE",
    "badge": "Inactive",
    "badgeIcon": "circle-slash",
    "deactivatedAt": "2026-03-15T00:00:00Z",
    "statusInfo": {
      "descText": "Subscription ended. Renew to restore your store."
    },
    "actions": [
      { "slug": "renew", "label": "Renew", "url": "https://buy.stripe.com/...", "variant": "primary" }
    ]
  }
}
```

---

## Action slugs

The store recognises these slugs and handles them:

| Slug | Behaviour |
|------|-----------|
| `subscribe` | Opens `url` in new tab |
| `add-billing` | Opens `url` in new tab; respects `disabled` + `disabledReason` |
| `manage-billing` | POSTs to `endpoint`, redirects to returned `{ url }` |
| `cancel` | Opens the modal identified by `action.modalSlug` from the plan's `actionModals` array |
| `reactivate` | Opens `url` in new tab |
| `renew` | Opens `url` in new tab |

Unknown slugs are rendered as buttons but no special handling is applied — safe to extend.

---

## Action variants

| Value | Use |
|-------|-----|
| `"primary"` | Main CTA (default for subscribe, add-billing) |
| `"secondary"` | Supporting action (manage-billing) |
| `"ghost"` | Minor affordance (cancel) |
| `"destructive"` | Destructive confirm |

---

## Action icons

`PlanAction` has separate `iconBefore?` and `iconAfter?` fields. Use any [Lucide](https://lucide.dev) icon name:

```json
{ "slug": "manage-billing", "label": "Manage Billing", "iconAfter": "external-link" }
```

---

## Badge icons

Any [Lucide](https://lucide.dev) icon name is valid. Common values:

| Value | Used for |
|-------|----------|
| `"check-circle-2"` | Active subscription |
| `"clock"` | Trial, expired — time-bounded states |
| `"circle-slash"` | Inactive |

---

## `actionModals`

Optional array on any plan. Each entry is a `ConfirmActionConfig` identified by `slug`. A `PlanAction` references an entry via `modalSlug` — when clicked, the store opens the matching dialog before executing the action. If `actionModals` is absent or no action has a `modalSlug`, no dialog is shown.

```json
{
  "actionModals": [
    {
      "slug": "cancel-trial",
      "heading": "Cancel your trial?",
      "description": "We'd love to know why before you go.",
      "reasonsLabel": "Reason for cancelling",
      "reasons": [
        { "value": "missing-features", "label": "Missing features I need" },
        { "value": "too-expensive", "label": "Plan too expensive" },
        { "value": "other", "label": "Other" }
      ],
      "keepLabel": "Keep trial",
      "confirmLabel": "Cancel Trial",
      "other": {
        "label": "Tell us a bit more",
        "placeholder": "What are we missing?",
        "maxLength": 500
      }
    },
    {
      "slug": "cancel-stripe",
      "heading": "Cancel your trial?",
      "description": "Your card is on file. Cancel to stop any future charges.",
      "reasonsLabel": "Reason for cancelling",
      "reasons": [
        { "value": "missing-features", "label": "Missing features I need" },
        { "value": "too-expensive", "label": "Plan too expensive" },
        { "value": "other", "label": "Other" }
      ],
      "keepLabel": "Keep trial",
      "confirmLabel": "Continue to Stripe",
      "confirmIcon": "external-link"
    }
  ]
}
```

`confirmIcon` is optional — include `"external-link"` when the confirm action navigates away from the store. `other` is optional — include to show a free-text textarea below the reason dropdown.

---

## Versioning

This spec follows [Semantic Versioning](https://semver.org). Breaking changes to existing state variants or action slugs increment the major version. New state variants and slugs are additive (minor). See [CHANGELOG](../CHANGELOG.md).
