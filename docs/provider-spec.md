# Provider Spec — artisan-roast-sdk

**Version:** 0.1.0

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
        "benefits": ["Feature one", "Feature two"],
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

## State variants

Each `HydratedPlan` has a `state` field. The `status` discriminant tells the store which layout to render.

### `none` — not subscribed

Show pricing and a subscribe CTA.

```json
{
  "state": {
    "status": "none",
    "actions": [
      { "slug": "subscribe", "label": "Subscribe Now", "url": "https://buy.stripe.com/..." }
    ]
  }
}
```

---

### `active` — active subscription

Show badge, renewal date, usage pools, and management CTA.

```json
{
  "state": {
    "status": "active",
    "badge": "Active",
    "badgeIcon": "check-circle-2",
    "renewalDate": "2026-05-30",
    "pools": [
      { "slug": "tickets", "label": "Priority Tickets", "limit": 5, "used": 2 }
    ],
    "actions": [
      {
        "slug": "manage-billing",
        "label": "Manage Billing",
        "endpoint": "/api/billing/portal",
        "icon": "external-link",
        "variant": "secondary"
      }
    ]
  }
}
```

---

### `trial` — active time-bounded trial

Show a days-remaining progress bar and billing CTA.

```json
{
  "state": {
    "status": "trial",
    "badge": "Active Trial",
    "badgeIcon": "clock",
    "daysRemaining": 10,
    "daysLimit": 14,
    "actions": [
      { "slug": "add-billing", "label": "Add Billing", "url": "https://buy.stripe.com/..." },
      { "slug": "cancel", "label": "Cancel", "variant": "ghost" }
    ]
  }
}
```

When billing has been added and the trial is extended to 30 days, return `badge: "Extended Trial"` and `daysLimit: 30`. To disable `add-billing` once billing is on file:

```json
{ "slug": "add-billing", "label": "Add Billing", "url": "...", "disabled": true, "disabledReason": "Billing already on file" }
```

---

### `expired` — grace period before deprovision

Show the progress bar at zero and a subscribe CTA.

```json
{
  "state": {
    "status": "expired",
    "badge": "Expired",
    "badgeIcon": "clock",
    "daysRemaining": 0,
    "daysLimit": 14,
    "deprovisionAt": "2026-05-14T00:00:00Z",
    "actions": [
      { "slug": "subscribe", "label": "Subscribe Now", "url": "https://buy.stripe.com/..." }
    ]
  }
}
```

---

### `cancelled` — subscription cancelled, reactivation window open

Show a countdown to deprovision and a reactivate CTA.

```json
{
  "state": {
    "status": "cancelled",
    "badge": "Cancellation Pending",
    "daysRemaining": 12,
    "daysLimit": 14,
    "deprovisionAt": "2026-05-14T00:00:00Z",
    "actions": [
      { "slug": "reactivate", "label": "Reactivate", "url": "https://buy.stripe.com/..." }
    ]
  }
}
```

---

### `inactive` — lapsed subscription

Show deactivation date, previous features, and a renew CTA.

```json
{
  "state": {
    "status": "inactive",
    "badge": "Inactive",
    "deactivatedAt": "2026-03-15T00:00:00Z",
    "previousFeatures": ["priority-support"],
    "actions": [
      { "slug": "renew", "label": "Renew", "url": "https://buy.stripe.com/..." }
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
| `cancel` | Opens the plan's `actionModal` dialog before proceeding |
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

## Badge icons

Any [Lucide](https://lucide.dev) icon name is valid. Common values:

| Value | Used for |
|-------|----------|
| `"check-circle-2"` | Active subscription |
| `"clock"` | Trial, expired — time-bounded states |

---

## `actionModal`

Optional on any plan. When present, the `cancel` action opens a reason-capture dialog before proceeding. If absent, the dialog trigger is hidden.

```json
{
  "actionModal": {
    "heading": "Cancel your plan?",
    "description": "Tell us why before you go.",
    "reasons": [
      { "value": "too-expensive", "label": "Too expensive" },
      { "value": "other", "label": "Other" }
    ],
    "keepLabel": "Keep plan",
    "confirmLabel": "Cancel plan",
    "confirmIcon": "external-link"
  }
}
```

`confirmIcon` is optional — include `"external-link"` when the confirm action navigates away from the store.

---

## Versioning

This spec follows [Semantic Versioning](https://semver.org). Breaking changes to existing state variants or action slugs increment the major version. New state variants and slugs are additive (minor). See [CHANGELOG](../CHANGELOG.md).
