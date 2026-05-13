# Provider Spec — artisan-roast-sdk

**Version:** 0.5.0

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

## `UsagePool`

Carried by `ACTIVE`, `TRIAL`, and `ExpiredState` as `pools: UsagePool[]`. A trial's remaining time is just another pool (`slug: "trial-days"`). Platform computes all values server-side. `PENDING` has no pools — provisioning has nothing to display yet.

```typescript
interface UsagePool {
  slug: string;
  label: string;       // e.g. "Trial days", "Priority Tickets"
  limit: number;       // total available
  used: number;        // consumed so far
  purchased?: number;  // add-on credits granted on top of plan allowance
  icon?: string;       // Lucide icon name rendered before the label
  countLabel: string;  // unit suffix — "{used} / {limit} {countLabel}" (e.g. "days", "used")
  cta?: PlanAction;    // optional per-pool action (e.g. "Book Session"); persists across plan states
}
```

Rendered as: `{icon} {label}   {used} / {limit} {countLabel}`

---

## `StatusInfo`

Optional secondary description line below the badge, available on all states except `NONE` (including `PENDING`). Platform builds the full sentence server-side — the store renders it verbatim.

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
      { "slug": "tickets", "label": "Priority Tickets", "icon": "ticket", "limit": 5, "used": 2, "countLabel": "used" }
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

Show the trial-days pool (a `UsagePool` with `slug: "trial-days"`) and a billing CTA.

```json
{
  "state": {
    "status": "TRIAL",
    "badge": "Active Trial",
    "badgeIcon": "clock",
    "pools": [
      { "slug": "trial-days", "icon": "clock", "label": "Trial days", "limit": 14, "used": 4, "countLabel": "days" }
    ],
    "actions": [
      { "slug": "add-billing", "label": "Add Billing", "url": "https://buy.stripe.com/...", "iconAfter": "external-link", "variant": "primary" },
      { "slug": "cancel", "label": "Cancel Trial", "variant": "ghost", "modalSlug": "cancel-trial" }
    ]
  }
}
```

When billing has been added and the trial is extended to 30 days, return `badge: "Extended Trial"` and `pools[0].limit: 30`. To disable `add-billing` once billing is on file:

```json
{ "slug": "add-billing", "label": "Add Billing", "url": "...", "disabled": true, "disabledReason": "Billing already on file" }
```

---

### `EXPIRED` — grace period before deprovision

Show the trial-days pool full (`used === limit`), `statusInfo` with the deprovision date, and a subscribe CTA.

```json
{
  "state": {
    "status": "EXPIRED",
    "badge": "Expired",
    "badgeIcon": "clock",
    "pools": [
      { "slug": "trial-days", "icon": "clock", "label": "Trial days", "limit": 14, "used": 14, "countLabel": "days" }
    ],
    "deprovisionAt": "2026-05-14T00:00:00Z",
    "statusInfo": {
      "descIcon": "alert-circle",
      "descText": "Trial ended. Store will be removed on May 14, 2026."
    },
    "actions": [
      { "slug": "subscribe", "label": "Subscribe Now", "url": "https://buy.stripe.com/...", "iconAfter": "external-link", "variant": "primary" }
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
      { "slug": "renew", "label": "Renew", "url": "https://buy.stripe.com/...", "iconAfter": "external-link", "variant": "primary" }
    ]
  }
}
```

---

### `PENDING` — provisioning after a paid conversion

The customer has paid (trial conversion or direct subscribe) and the store is being provisioned — this can take minutes. Render a NONE-shaped card: plan name, `statusInfo` copy, a "Check Status" CTA, and a spinner during the poll. The resolver keeps returning `PENDING` while provisioning, then `ACTIVE` once the store is live. This is **not** a frozen-modal wait — the customer can navigate away and come back.

No `pools` — provisioning has no usage to display yet.

```json
{
  "state": {
    "status": "PENDING",
    "statusInfo": {
      "descIcon": "loader-2",
      "descText": "Setting up your store — this can take a few minutes."
    },
    "actions": [
      { "slug": "check-status", "label": "Check Status", "endpoint": "/api/plans/status", "variant": "primary" }
    ]
  }
}
```

The paid conversion that produces `PENDING` is driven by a `paymentConfirm` action modal (see [`actionModals`](#actionmodals) below) — the subscribe action opens it, the charge resolves, the resolver flips the plan to `PENDING`.

---

## Action slugs

The store recognises these slugs and handles them:

| Slug | Behaviour |
|------|-----------|
| `subscribe` | Opens `url` in new tab, or — if `modalSlug` points at a `paymentConfirm` modal — opens that modal; on charge resolve the plan flips to `PENDING` |
| `add-billing` | Opens `url` in new tab; respects `disabled` + `disabledReason` |
| `manage-billing` | POSTs to `endpoint`, redirects to returned `{ url }` |
| `cancel` | Opens the modal identified by `action.modalSlug` from the plan's `actionModals` array (a `feedbackForm`) |
| `check-status` | POSTs to `endpoint` to re-check provisioning; rendered on `PENDING` cards alongside a spinner |
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

Optional array on any plan. Each entry is an `ActionModal` — a discriminated union on `type`, identified by `slug`. A `PlanAction` references an entry via `modalSlug`; when the action is clicked, the store opens the matching modal and branches on `modal.type` to render the right shape. If `actionModals` is absent or no action has a `modalSlug`, no modal is shown. All UI copy comes from the config — no hardcoded strings in the store.

### `type: "feedbackForm"` — "tell us why" dialog

Reasons dropdown + keep/confirm. On confirm, the store runs the action. (This is the shape that was `ConfirmActionConfig` before v0.5.0.) `confirmIcon` is optional — include `"external-link"` when the confirm action navigates away from the store. `other` is optional — include to show a free-text textarea below the reason dropdown.

```json
{
  "actionModals": [
    {
      "type": "feedbackForm",
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
      "type": "feedbackForm",
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

### `type: "paymentConfirm"` — payment-loop modal

The popup during a paid conversion. The customer confirms the charge, then sees a non-dismissable spinner with status copy while Stripe processes; the modal closes when the charge resolves, and the plan then flips to `PENDING`. `description` is optional (a price line / pre-confirm copy). `processingMessages` is the status copy under the spinner — a single string, or an ordered list the store cycles through.

```json
{
  "actionModals": [
    {
      "type": "paymentConfirm",
      "slug": "convert-payment",
      "heading": "Completing your subscription",
      "description": "You'll be charged $79.00/month. Cancel anytime.",
      "confirmLabel": "Confirm and pay",
      "processingMessages": ["Processing payment…", "Almost there…"]
    }
  ]
}
```

A `subscribe` action references it via `"modalSlug": "convert-payment"`.

---

## Versioning

This spec follows [Semantic Versioning](https://semver.org). Breaking changes to existing state variants or action slugs increment the major version. New state variants and slugs are additive (minor). See [CHANGELOG](../CHANGELOG.md).
