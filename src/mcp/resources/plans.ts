import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Resolve project root from compiled location (dist/mcp/resources → project root)
const ROOT = join(__dirname, "..", "..", "..");

const CONSUMER_GUIDE = `# Consumer Integration Guide — artisan-roast-sdk

## Overview

Fetch \`HydratedPlan[]\` from \`GET /api/plans/resolved\` and render each plan card
based on \`plan.state.status\`. The store has no slug-specific logic — all state
and copy come from the payload.

## Endpoint

\`\`\`
GET /api/plans/resolved
Authorization: Bearer <license-key>
\`\`\`

Response shape: \`ResolvedPlansResponse { plans: HydratedPlan[], resolvedAt: string }\`

Recommended poll cadence: 60 seconds (\`revalidate: 60\` on the server component).

## Dispatch pattern

Switch on \`plan.state.status\` to render the correct card layout:

\`\`\`typescript
switch (plan.state.status) {
  case "NONE":
    // Not subscribed — show plan.state.actions (subscribe CTA)
    break;
  case "ACTIVE":
    // Active subscription — show badge, renewalDate, pools (UsageBar), manage CTA
    break;
  case "TRIAL":
    // Active trial — show badge, days-remaining bar (daysRemaining / daysLimit)
    break;
  case "EXPIRED":
    // Grace period — show badge, bar at 0, deprovisionAt warning, subscribe CTA
    break;
  case "CANCELLED":
    // Cancelled — show countdown to deprovision, reactivate CTA
    break;
  case "INACTIVE":
    // Lapsed — show deactivatedAt, previousFeatures, renew CTA
    break;
}
\`\`\`

## Visibility filtering

Filter by build mode before rendering:

\`\`\`typescript
const IS_HOSTED = !!process.env.HOSTED_TRIAL_ID || !!process.env.LICENSE_KEY;
const visiblePlans = plans.filter(
  (p) => p.visibility === (IS_HOSTED ? "hosted" : "self-hosted")
);
\`\`\`

## Actions

Each \`PlanState\` carries an \`actions\` array. Render them as buttons:
- \`url\`: open in new tab
- \`endpoint\`: POST to the platform path, follow the returned \`{ url }\`
- Respect \`disabled\` and \`disabledReason\` — render a tooltip when disabled

## Cancel dialog

If \`plan.actionModal\` is set, render a reason-capture dialog on the \`cancel\`
action before proceeding. The dialog heading, description, reasons list, and
button labels all come from \`plan.actionModal\` — no hardcoded copy in the store.
`;

export function registerPlanResources(server: McpServer): void {
  server.registerResource(
    "plans-types",
    "plans://types",
    {
      description:
        "TypeScript source for Plan, HydratedPlan, PlanState, PlanAction, and UsagePool types.",
      mimeType: "text/plain",
    },
    async () => {
      const source = readFileSync(
        join(ROOT, "src", "plans", "index.ts"),
        "utf-8"
      );
      return {
        contents: [{ uri: "plans://types", mimeType: "text/plain", text: source }],
      };
    }
  );

  server.registerResource(
    "plans-integration-producer",
    "plans://integration/producer",
    {
      description:
        "Provider integration spec: how to implement GET /api/plans and GET /api/plans/resolved.",
      mimeType: "text/plain",
    },
    async () => {
      const spec = readFileSync(
        join(ROOT, "docs", "provider-spec.md"),
        "utf-8"
      );
      return {
        contents: [
          { uri: "plans://integration/producer", mimeType: "text/plain", text: spec },
        ],
      };
    }
  );

  server.registerResource(
    "plans-integration-consumer",
    "plans://integration/consumer",
    {
      description:
        "Consumer integration guide: how to fetch and render HydratedPlan[] in a store.",
      mimeType: "text/plain",
    },
    async () => {
      return {
        contents: [
          {
            uri: "plans://integration/consumer",
            mimeType: "text/plain",
            text: CONSUMER_GUIDE,
          },
        ],
      };
    }
  );
}
