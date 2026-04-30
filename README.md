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
        details: { benefits: ["Great feature included"] },
        highlight: false,
        visibility: "self-hosted",
        state: {
          status: "none",
          actions: [
            { slug: "subscribe", label: "Subscribe", url: "https://..." },
          ],
        },
      },
    ],
  };
}
```

## What you need to implement

Two endpoints:

| Endpoint | Auth | Purpose |
|----------|------|---------|
| `GET /api/plans` | None | Static plan definitions |
| `GET /api/plans/resolved` | Bearer license key | Plans with computed per-instance state |

Read the [Provider Spec](docs/provider-spec.md) for the full contract — all state variants, action slugs the store handles, and example payloads.

## Packages

| Import | Contents |
|--------|----------|
| `artisan-roast-sdk` | Everything |
| `artisan-roast-sdk/plans` | Plan types only |

## Contributing

Open an issue or PR — all contributions welcome. MIT licensed.
