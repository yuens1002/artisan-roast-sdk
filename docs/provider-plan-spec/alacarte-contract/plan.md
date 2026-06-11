# À La Carte Contract — SDK Feature Plan

**Level:** SDK (type contract + Zod schemas + scaffolds)
**Branch:** `feat/alacarte-contract` (cut from `main` after pulling published v0.5.1)
**Version target:** v0.6.0
**Created:** 2026-06-11
**Status:** ⬜ planning
**Owner:** SDK maintainer

---

## Why

SDK v0.5.1 (shipped) added `PendingState` and discriminated `ActionModal` types for the plans resolver. The à la carte surface — `GET /api/add-ons` and `POST /api/checkout` (à la carte path) — has **no SDK contract at all**. The store (`ecomm-ai-app`) already has a live add-ons page that calls both endpoints using locally-defined (undocumented) types. Consequences:

- The store has no way to import typed shapes for these endpoints — they maintain local mirrors.
- The platform can change the add-ons response shape without the store knowing.
- No Zod schema means the store can't validate API responses at runtime.
- No scaffold fixtures means the store's add-ons component tests can't use SDK-sourced reference data.

> **Local SDK sync prerequisite:** the local `artisan-roast-sdk` working copy is at v0.4.1; v0.5.1 was published as a GitHub tag but not pulled locally. Pull `origin/main` and confirm the local version reads `0.5.1` before cutting `feat/alacarte-contract`.

---

## What the platform exposes (producer contracts to codify)

### `GET /api/add-ons` — public, unauthenticated

```json
{
  "packages": [
    {
      "id": "alacarte-tickets-5",
      "label": "5 Support Tickets",
      "description": "Add 5 priority support tickets to your account. Never expire.",
      "price": "$39",
      "checkoutUrl": "/api/checkout",
      "pools": [{ "slug": "ticket", "label": "Priority Tickets", "quantity": 5 }]
    },
    {
      "id": "alacarte-sessions-2",
      "label": "2 1:1 Sessions (30 min)",
      "description": "Add 2 scheduled 1:1 sessions. Never expire.",
      "price": "$99",
      "checkoutUrl": "/api/checkout",
      "pools": [{ "slug": "one_on_one", "label": "1:1 Sessions", "quantity": 2 }]
    }
  ]
}
```

### `POST /api/checkout` — public, unauthenticated

Two mutually exclusive request variants:

**Plan subscription:**
```json
{ "planSlug": "house-blend", "customerEmail"?: "...", "instanceId"?: "...", "callbackUrl"?: "...", "trial"?: false }
```

**À la carte one-time:**
```json
{ "alaCarteSlug": "alacarte-tickets-5", "customerEmail": "user@example.com", "instanceId"?: "...", "callbackUrl"?: "..." }
```

Both return: `{ "url": "https://checkout.stripe.com/..." }`

---

## Decisions

| # | Decision | Rationale |
|---|---|---|
| D1 | New export path `./alacarte` — separate from `./plans` | Keeps the plans contract clean; add-ons consumers don't need plan types |
| D2 | `price` field is a formatted string (`"$39"`, not cents int) | Platform formats before emitting; SDK mirrors the wire shape, not the internal DB value |
| D3 | `CheckoutRequest` is a discriminated union (`planSlug` vs `alaCarteSlug` variants), not a merged object | Prevents the caller from sending both fields; matches the platform's branch logic |
| D4 | `AlaCartePool` re-uses a minimal pool shape (slug + label + quantity) — NOT `UsagePool` | `UsagePool` carries live usage/limit state; `AlaCartePool` describes what a package grants, not current usage |
| D5 | Add scaffold fixtures for both packages (for store component tests) | Consistent with how plans use `SCENARIOS` — store tests should not hardcode fixture data |

---

## Session 1 — À La Carte Contract (this session)

### Deliverables

| ID | What | File | Kind | Owning role |
|----|------|------|------|-------------|
| D1 | `AlaCartePool`, `AlaCartePackage`, `AddOnsResponse` types + Zod schemas | `src/alacarte/index.ts` | types | `/backend-architect` |
| D2 | `CheckoutRequest` discriminated union + `CheckoutResponse` type + schemas | `src/alacarte/index.ts` | types | `/backend-architect` |
| D3 | Scaffold fixtures (`ALACARTE_SCENARIOS`) + `ALACARTE_SCENARIO_KEYS` | `src/alacarte/scaffolds.ts` | scaffolds | `/backend-architect` |
| D4 | New export path `./alacarte` in `package.json` | `package.json` | config | `/backend-architect` |
| D5 | Re-export from `src/index.ts` (`export * from "./alacarte"`) | `src/index.ts` | config | `/backend-architect` |
| D6 | Spec update — add à la carte endpoints section | `spec/provider-plan.spec.md` | docs | `/backend-architect` |
| D7 | CHANGELOG entry — v0.6.0 | `CHANGELOG.md` | docs | `/backend-architect` |
| D8 | Zod round-trip tests + `CheckoutRequest` discrimination test | `test/alacarte.test.cjs` | test | `/test-engineer` |

### Type shapes

```typescript
// src/alacarte/index.ts

export interface AlaCartePool {
  slug: string;
  label: string;
  quantity: number;
}

export interface AlaCartePackage {
  id: string;           // package slug, e.g. "alacarte-tickets-5"
  label: string;        // display name, e.g. "5 Support Tickets"
  description: string;
  price: string;        // formatted string, e.g. "$39"
  checkoutUrl: string;  // platform checkout endpoint path
  pools: AlaCartePool[];
}

export interface AddOnsResponse {
  packages: AlaCartePackage[];
}

// Discriminated on which key is present
export type CheckoutRequest =
  | {
      planSlug: string;
      customerEmail?: string;
      instanceId?: string;
      callbackUrl?: string;
      trial?: boolean;
    }
  | {
      alaCarteSlug: string;
      customerEmail: string; // required for à la carte
      instanceId?: string;
      callbackUrl?: string;
    };

export interface CheckoutResponse {
  url: string;
}
```

### Scaffold fixtures

```typescript
// src/alacarte/scaffolds.ts

export const ALACARTE_SCENARIOS = {
  TICKETS_5: {
    id: "alacarte-tickets-5",
    label: "5 Support Tickets",
    description: "Add 5 priority support tickets to your account. Never expire.",
    price: "$39",
    checkoutUrl: "/api/checkout",
    pools: [{ slug: "ticket", label: "Priority Tickets", quantity: 5 }],
  },
  SESSIONS_2: {
    id: "alacarte-sessions-2",
    label: "2 1:1 Sessions (30 min)",
    description: "Add 2 scheduled 1:1 sessions. Never expire.",
    price: "$99",
    checkoutUrl: "/api/checkout",
    pools: [{ slug: "one_on_one", label: "1:1 Sessions", quantity: 2 }],
  },
} as const satisfies Record<string, import("./index").AlaCartePackage>;

export const ALACARTE_SCENARIO_KEYS = Object.keys(ALACARTE_SCENARIOS) as (keyof typeof ALACARTE_SCENARIOS)[];
```

---

## Verification approach

All deliverables are type/schema definitions — verified by:
- TypeScript compile clean (`tsc --noEmit`)
- Zod schema round-trip tests against the scaffold fixtures
- `HydratedPlanSchema` still passes (no regression to plans types)

---

## Store handoff

See platform repo: `docs/appendix/cross-repo/alacarte-sdk-handoff.md` — full change list, migration guide, and store-side tasks.
