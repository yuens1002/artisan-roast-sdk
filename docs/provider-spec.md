# Provider Spec — artisan-roast-sdk

**Version:** 0.2.1

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

Show badge, renewal date, usage pools, and management CTA.

```json
{
  "state": {
    "status": "ACTIVE",
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

### `TRIAL` — active time-bounded trial

Show a days-remaining progress bar and billing CTA.

```json
{
  "state": {
    "status": "TRIAL",
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

### `EXPIRED` — grace period before deprovision

Show the progress bar at zero and a subscribe CTA.

```json
{
  "state": {
    "status": "EXPIRED",
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
    "actions": [
      { "slug": "reactivate", "label": "Reactivate", "url": "https://buy.stripe.com/..." }
    ]
  }
}
```

---

### `INACTIVE` — lapsed subscription

Show deactivation date, previous features, and a renew CTA.

```json
{
  "state": {
    "status": "INACTIVE",
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

## Badge icons

Any [Lucide](https://lucide.dev) icon name is valid. Common values:

| Value | Used for |
|-------|----------|
| `"check-circle-2"` | Active subscription |
| `"clock"` | Trial, expired — time-bounded states |

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
      "confirmLabel": "Cancel trial",
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
