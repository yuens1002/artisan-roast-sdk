# artisan-roast-sdk

TypeScript SDK for building integrations with [Artisan Roast](https://github.com/yuens1002/artisan-roast) stores.

Implement the provider contract and your plans, add-ons, or plugins will render in any Artisan Roast store — no store-side code changes required. Community providers are welcome.

## Install

```bash
npm install artisan-roast-sdk
```

## Quick start

```ts
import type {
  HydratedPlan,
  PlanState,
  PlanAction,
  ResolvedPlansResponse,
} from "artisan-roast-sdk";

// Your provider returns this shape from GET /api/plans/resolved
function resolvePlans(licenseKey: string): ResolvedPlansResponse {
  return {
    resolvedAt: new Date().toISOString(),
    plans: [
      {
        slug: "my-plan",
        name: "My Plan",
        description: "A community plan",
        price: 2900,
        currency: "USD",
        interval: "month",
        features: ["my-feature"],
        details: { benefits: { activeItems: ["Great feature included"] } },
        highlight: false,
        visibility: "self-hosted",
        state: {
          status: "NONE",
          actions: [
            { slug: "subscribe", label: "Subscribe", url: "https://...", variant: "primary", iconAfter: "external-link" },
          ],
        },
      },
    ],
  };
}
```

## What you need to implement

Core plan endpoints:

| Endpoint | Auth | Purpose |
|----------|------|---------|
| `GET /api/plans` | None | Static plan definitions |
| `GET /api/plans/resolved` | Bearer license key | Plans with computed per-instance state |

À la carte endpoints (optional — implement if you offer one-time add-ons):

| Endpoint | Auth | Purpose |
|----------|------|---------|
| `GET /api/add-ons` | None | À la carte package catalogue |
| `POST /api/checkout` | None | Initiate a checkout session (plan subscription or à la carte) |

Read the [Provider Spec](spec/provider-plan.spec.md) for the full contract — all state variants (`NONE`, `ACTIVE`, `TRIAL`, `EXPIRED`, `CANCELLED`, `INACTIVE`, `PENDING`), action slugs the store handles, and example payloads.

## Packages

| Import | Contents |
|--------|----------|
| `artisan-roast-sdk` | Everything |
| `artisan-roast-sdk/plans` | Plan types only |
| `artisan-roast-sdk/alacarte` | À la carte types, schemas, and scaffold fixtures |

## Contributing

Open an issue or PR — all contributions welcome. MIT licensed.
