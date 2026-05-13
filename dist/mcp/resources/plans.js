"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPlanResources = registerPlanResources;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
// Resolve project root from compiled location (dist/mcp/resources → project root)
const ROOT = (0, node_path_1.join)(__dirname, "..", "..", "..");
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

Switch on \`plan.state.status\` to render the correct card layout. The switch
must be exhaustive — every variant below has a case:

\`\`\`typescript
switch (plan.state.status) {
  case "NONE":
    // Not subscribed — show plan.state.actions (subscribe CTA)
    break;
  case "ACTIVE":
    // Active subscription — show badge, statusInfo, pools (UsageBar), manage CTA
    break;
  case "TRIAL":
    // Active trial — show badge, pools (trial-days UsageBar), statusInfo, billing CTA
    break;
  case "EXPIRED":
    // Grace period — show badge, pools at full, statusInfo (deprovision date), subscribe CTA
    break;
  case "CANCELLED":
    // Cancelled — show countdown to deprovision, statusInfo, reactivate CTA
    break;
  case "INACTIVE":
    // Lapsed — show deactivatedAt, statusInfo, inactiveItems benefits, renew CTA
    break;
  case "PENDING":
    // Provisioning after a paid conversion — NONE-shaped card: name, statusInfo
    // copy, "Check Status" primary CTA, spinner during the poll. Resolver returns
    // PENDING again while provisioning, then ACTIVE once the store is live.
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

## Benefits block

\`plan.details.benefits\` is a \`BenefitsBlock\`, not a plain string array. Render
the correct items based on state:

\`\`\`typescript
const block = plan.details.benefits;
const items = state.status === "INACTIVE" && block?.inactiveItems
  ? block.inactiveItems
  : block?.activeItems ?? [];
const header = state.status === "INACTIVE"
  ? block?.inactiveHeader
  : block?.activeHeader;
\`\`\`

Item icons (green check) are hardcoded in the component — not a payload field.

## Usage pools

\`ActiveState\`, \`TrialState\`, and \`ExpiredState\` carry \`pools: UsagePool[]\`.
A trial's remaining time is just another pool (\`slug: "trial-days"\`):

\`\`\`typescript
// UsagePool shape
{ slug: "trial-days", icon: "clock", label: "Trial days", limit: 14, used: 10, countLabel: "days" }
// Render as: <Icon name={pool.icon} /> {pool.label}  {pool.used} / {pool.limit} {pool.countLabel}
\`\`\`

A pool may carry an optional \`cta: PlanAction\` (e.g. "Book Session" on a sessions pool).
\`PENDING\` has no pools — provisioning has no usage to display yet.

## Status info

\`statusInfo?: { descIcon?: string; descText?: string }\` is an optional secondary
line below the badge. The platform builds the full sentence; the store renders it:

\`\`\`typescript
if (state.statusInfo?.descText) {
  // render: <Icon name={state.statusInfo.descIcon} /> {state.statusInfo.descText}
}
\`\`\`

Present on: ACTIVE, TRIAL, EXPIRED, CANCELLED, INACTIVE, PENDING.

## Actions

Each \`PlanState\` carries an \`actions\` array. Render them as buttons:
- \`url\`: open in new tab
- \`endpoint\`: POST to the platform path, follow the returned \`{ url }\`
- \`iconBefore\` / \`iconAfter\`: Lucide icon rendered before or after the label
- Respect \`disabled\` and \`disabledReason\` — render a tooltip when disabled

## Action modals

If an action has a \`modalSlug\`, look up the matching entry in \`plan.actionModals\`
by slug and open it before proceeding. \`actionModals\` is a discriminated union on
\`type\` — branch on it:

\`\`\`typescript
const modal = plan.actionModals?.find((m) => m.slug === action.modalSlug);
switch (modal?.type) {
  case "feedbackForm":
    // "Tell us why" dialog — reasons dropdown + keep/confirm.
    // Copy: heading, description, reasonsLabel, reasons[], keepLabel, confirmLabel,
    // confirmIcon?, other? ({ label, placeholder, maxLength }). On confirm, run the action.
    break;
  case "paymentConfirm":
    // Payment-loop modal — confirm the charge, then a non-dismissable spinner +
    // processingMessages cycling while Stripe processes; closes when the charge
    // resolves (the plan then flips to PENDING).
    // Copy: heading, description?, confirmLabel, processingMessages[].
    break;
}
\`\`\`

All UI copy comes from the modal config — no hardcoded strings in the store.
`;
function registerPlanResources(server) {
    server.registerResource("plans-types", "plans://types", {
        description: "TypeScript source for Plan, HydratedPlan, PlanState, PlanAction, and UsagePool types.",
        mimeType: "text/plain",
    }, async () => {
        const source = (0, node_fs_1.readFileSync)((0, node_path_1.join)(ROOT, "src", "plans", "index.ts"), "utf-8");
        return {
            contents: [{ uri: "plans://types", mimeType: "text/plain", text: source }],
        };
    });
    server.registerResource("plans-integration-producer", "plans://integration/producer", {
        description: "Provider integration spec: how to implement GET /api/plans and GET /api/plans/resolved.",
        mimeType: "text/plain",
    }, async () => {
        const spec = (0, node_fs_1.readFileSync)((0, node_path_1.join)(ROOT, "spec", "provider-plan.spec.md"), "utf-8");
        return {
            contents: [
                { uri: "plans://integration/producer", mimeType: "text/plain", text: spec },
            ],
        };
    });
    server.registerResource("plans-integration-consumer", "plans://integration/consumer", {
        description: "Consumer integration guide: how to fetch and render HydratedPlan[] in a store.",
        mimeType: "text/plain",
    }, async () => {
        return {
            contents: [
                {
                    uri: "plans://integration/consumer",
                    mimeType: "text/plain",
                    text: CONSUMER_GUIDE,
                },
            ],
        };
    });
}
//# sourceMappingURL=plans.js.map