/**
 * Artisan Roast Plan SDK
 *
 * TypeScript types and endpoint contract for building plan integrations.
 * Any plan provider — first-party or community — implements this shape.
 *
 * @see https://github.com/yuens1002/artisan-roast-sdk
 */
export { SCENARIOS, SCENARIO_KEYS } from "./scaffolds";
/**
 * Benefit item block.
 * Drives the benefits list on a plan card.
 * Platform builds these strings server-side; component controls icon and colour.
 * Each item is capped at 50 characters for card legibility.
 */
export interface BenefitsBlock {
    /** Heading shown in active/trial/expired states (e.g. "What's included:"). Omit to skip heading. */
    activeHeader?: string;
    /** Benefit items for active/trial/expired states. 50 char max per item. */
    activeItems: string[];
    /** Heading shown in INACTIVE state (e.g. "Renew to get back:"). Omit to skip heading. */
    inactiveHeader?: string;
    /** Benefit items for INACTIVE state. Falls back to activeItems if absent. 50 char max per item. */
    inactiveItems?: string[];
}
export interface PlanDetails {
    sla?: {
        availability?: string;
        responseTime?: string;
        sessionBooking?: string;
        sessionDuration?: string;
    };
    scope?: string[];
    terms?: string[];
    quotas?: Array<{
        icon: string;
        slug: string;
        label: string;
        limit: number;
    }>;
    benefits?: BenefitsBlock;
    excludes?: string[];
}
/**
 * "Tell us why" feedback dialog — reasons dropdown + keep/confirm.
 * Drives the reason-capture flow for any workflow (cancel, downgrade, etc.).
 * (Was `ConfirmActionConfig` pre-v0.5.0.)
 */
export interface FeedbackFormModal {
    /** Discriminator */
    type: "feedbackForm";
    /** Unique identifier within the plan — PlanAction.modalSlug references this */
    slug: string;
    /** Dialog heading */
    heading: string;
    /** Dialog body copy */
    description: string;
    /** Label for the reason dropdown */
    reasonsLabel: string;
    /** Reason dropdown options */
    reasons: Array<{
        value: string;
        label: string;
    }>;
    /** Dismiss button label */
    keepLabel: string;
    /** Confirm button label */
    confirmLabel: string;
    /** Lucide icon name for the confirm button (e.g. "external-link"). Omit for no icon. */
    confirmIcon?: string;
    /** "Other" free-text field — omit to hide */
    other?: {
        label: string;
        placeholder: string;
        /** Character limit; drives the "0 / N" counter */
        maxLength: number;
    };
}
/**
 * Payment-loop modal — the popup during a paid conversion. Confirm the
 * charge, then a non-dismissable spinner + status copy while Stripe
 * processes; closes when the charge resolves (the plan then flips to
 * `PENDING`).
 */
export interface PaymentConfirmModal {
    /** Discriminator */
    type: "paymentConfirm";
    /** Unique identifier within the plan — PlanAction.modalSlug references this */
    slug: string;
    /** Dialog heading (e.g. "Completing your subscription") */
    heading: string;
    /** Optional pre-confirm copy / price line shown before the customer confirms */
    description?: string;
    /** Confirm button label (e.g. "Confirm and pay") */
    confirmLabel: string;
    /**
     * Status copy shown under the spinner while the charge is in flight.
     * A single string, or an ordered list the store cycles through
     * ("Processing payment…" → "Almost there…").
     */
    processingMessages: string[];
}
export type ActionModal = FeedbackFormModal | PaymentConfirmModal;
export interface Plan {
    /** URL-safe identifier (e.g. "priority-support") */
    slug: string;
    /** Display name */
    name: string;
    /** Short tagline */
    description: string;
    /** Price in cents */
    price: number;
    /** ISO 4217 currency code */
    currency: string;
    /** Billing interval */
    interval: "month" | "year";
    /** Feature slugs bundled with this plan */
    features: string[];
    /** Rich detail for plan detail pages */
    details: PlanDetails;
    /** Whether to visually highlight this plan card */
    highlight: boolean;
    /** Which build mode renders this plan */
    visibility: "self-hosted" | "hosted";
    /** Sale price in cents */
    salePrice?: number;
    /** ISO 8601 sale expiry */
    saleEndsAt?: string;
    /** Sale badge text (e.g. "Launch Special") */
    saleLabel?: string;
    /** Modal configs (feedback form or payment confirm). PlanAction.modalSlug references entries by slug. Omit to hide all modals. */
    actionModals?: ActionModal[];
}
export interface UsagePool {
    slug: string;
    label: string;
    limit: number;
    used: number;
    purchased?: number;
    /** Lucide icon name rendered before the pool label */
    icon?: string;
    /** Unit suffix — consumers render "{used} / {limit} {countLabel}" (e.g. "days", "used"). Omit to render "{used} / {limit}" with no suffix. */
    countLabel?: string;
    /** Per-pool action — e.g. "Book 1:1 Session" on the sessions pool. Persists across plan states (add-on credits don't expire). */
    cta?: PlanAction;
}
export interface StatusInfo {
    /** Lucide icon name shown beside the description (e.g. "rotate-cw") */
    descIcon?: string;
    /** Full sentence status description (e.g. "Renews on May 28, 2026.") */
    descText?: string;
}
export interface PlanAction {
    /** Stable identifier — store uses this to match known interaction patterns */
    slug: string;
    /** Button label */
    label: string;
    /** External URL (Stripe Payment Link, billing portal, etc.) */
    url?: string;
    /** Internal platform endpoint path the store POSTs to on click */
    endpoint?: string;
    /** Lucide icon name rendered before the label */
    iconBefore?: string;
    /** Lucide icon name rendered after the label */
    iconAfter?: string;
    /** Button visual variant */
    variant?: "primary" | "secondary" | "ghost" | "destructive";
    /** Which actionModals[] entry (by slug) to open before executing this action */
    modalSlug?: string;
    disabled?: boolean;
    /** Tooltip shown when disabled */
    disabledReason?: string;
}
export type PlanState = NoneState | ActiveState | TrialState | ExpiredState | CancelledState | InactiveState | PendingState;
/** Not subscribed — show pricing and subscribe CTA */
export interface NoneState {
    status: "NONE";
    actions: PlanAction[];
}
/**
 * Plan is provisioning after a successful paid conversion. The store renders
 * a NONE-shaped plan card with `statusInfo` copy + a "Check Status" action +
 * a spinner during the poll. The resolver returns `PENDING` again while
 * provisioning, then `ACTIVE` once the store is live. May take minutes —
 * this is NOT a frozen-modal wait; the customer can navigate away and back.
 *
 * Has `actions[]` (Check Status is an action). No `pools[]` — provisioning
 * has no usage to display yet.
 */
export interface PendingState {
    status: "PENDING";
    /** Secondary status line (e.g. "Setting up your store — this can take a few minutes.") */
    statusInfo?: StatusInfo;
    /** Typically one endpoint-backed "Check Status" action */
    actions: PlanAction[];
}
/** Active subscription */
export interface ActiveState {
    status: "ACTIVE";
    badge: string;
    badgeIcon?: string;
    /** Secondary status line (e.g. "Renews on May 28, 2026.") */
    statusInfo?: StatusInfo;
    pools: UsagePool[];
    actions: PlanAction[];
}
/** Active time-bounded trial */
export interface TrialState {
    status: "TRIAL";
    badge: string;
    badgeIcon?: string;
    pools: UsagePool[];
    deprovisionAt?: string;
    statusInfo?: StatusInfo;
    actions: PlanAction[];
}
/** Trial or subscription expired — grace period before deprovision */
export interface ExpiredState {
    status: "EXPIRED";
    badge: string;
    badgeIcon?: string;
    pools: UsagePool[];
    deprovisionAt?: string;
    statusInfo?: StatusInfo;
    actions: PlanAction[];
}
/** Subscription cancelled — reactivation window open */
export interface CancelledState {
    status: "CANCELLED";
    badge: string;
    daysRemaining: number;
    daysLimit: number;
    deprovisionAt: string;
    statusInfo?: StatusInfo;
    actions: PlanAction[];
}
/** Lapsed subscription — previously held this plan */
export interface InactiveState {
    status: "INACTIVE";
    badge: string;
    badgeIcon?: string;
    deactivatedAt: string;
    statusInfo?: StatusInfo;
    actions: PlanAction[];
}
export interface HydratedPlan extends Plan {
    state: PlanState;
}
/** GET /api/plans — public, unauthenticated, cacheable */
export interface PlansResponse {
    plans: Plan[];
}
/**
 * GET /api/plans/resolved — authenticated (Bearer license key)
 *
 * Returns the plan catalog filtered and hydrated for the requesting instance.
 * Each plan carries computed `state` and `actions` — the store renders
 * these directly with no slug-specific logic.
 *
 * Poll cadence: ~60 seconds (same as trial status).
 */
export interface ResolvedPlansResponse {
    plans: HydratedPlan[];
    /** ISO 8601 timestamp of when state was computed */
    resolvedAt: string;
}
//# sourceMappingURL=index.d.ts.map