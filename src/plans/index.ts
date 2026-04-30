/**
 * Artisan Roast Plan SDK
 *
 * TypeScript types and endpoint contract for building plan integrations.
 * Any plan provider — first-party or community — implements this shape.
 *
 * @see https://github.com/yuens1002/artisan-roast-plan-sdk
 */

// ---------------------------------------------------------------------------
// Plan details
// ---------------------------------------------------------------------------

export interface PlanDetails {
  sla?: {
    availability?: string;
    responseTime?: string;
    videoCallBooking?: string;
    videoCallDuration?: string;
  };
  scope?: string[];
  terms?: string[];
  quotas?: Array<{ icon: string; slug: string; label: string; limit: number }>;
  benefits?: string[];
  excludes?: string[];
}

// ---------------------------------------------------------------------------
// Confirm action config
// Drives the reason-capture dialog for any workflow (cancel, downgrade, etc.)
// ---------------------------------------------------------------------------

export interface ConfirmActionConfig {
  /** Dialog heading */
  heading: string;
  /** Dialog body copy */
  description: string;
  /** Reason dropdown options */
  reasons: Array<{ value: string; label: string }>;
  /** Dismiss button label */
  keepLabel: string;
  /** Confirm button label */
  confirmLabel: string;
  /** Lucide icon name for the confirm button (e.g. "external-link"). Omit for no icon. */
  confirmIcon?: string;
}

// ---------------------------------------------------------------------------
// Plan (static definition — public, unauthenticated)
// ---------------------------------------------------------------------------

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
  /** Reason-capture dialog config. Omit to hide the dialog trigger. */
  actionModal?: ConfirmActionConfig;
}

// ---------------------------------------------------------------------------
// Usage pool
// Rendered as a progress bar on active plan cards.
// ---------------------------------------------------------------------------

export interface UsagePool {
  slug: string;
  label: string;
  limit: number;
  used: number;
  purchased?: number;
}

// ---------------------------------------------------------------------------
// Plan action
// Drives every CTA on a plan card. The store renders actions without
// knowing what plan or provider produced them.
// ---------------------------------------------------------------------------

export interface PlanAction {
  /** Stable identifier — store uses this to match known interaction patterns */
  slug: string;
  /** Button label */
  label: string;
  /** External URL (Stripe Payment Link, billing portal, etc.) */
  url?: string;
  /** Internal platform endpoint path the store POSTs to on click */
  endpoint?: string;
  /** Lucide icon name */
  icon?: string;
  /** Button visual variant */
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  disabled?: boolean;
  /** Tooltip shown when disabled */
  disabledReason?: string;
}

// ---------------------------------------------------------------------------
// Plan state (computed per instance — authenticated)
// Discriminated union on `status`. The store renders state without
// any slug-specific logic.
// ---------------------------------------------------------------------------

export type PlanState =
  | NoneState
  | ActiveState
  | TrialState
  | ExpiredState
  | CancelledState
  | InactiveState;

/** Not subscribed — show pricing and subscribe CTA */
export interface NoneState {
  status: "none";
  actions: PlanAction[];
}

/** Active subscription */
export interface ActiveState {
  status: "active";
  badge: string;
  badgeIcon?: string;
  renewalDate?: string;
  pools: UsagePool[];
  actions: PlanAction[];
}

/** Active time-bounded trial */
export interface TrialState {
  status: "trial";
  badge: string;
  badgeIcon?: string;
  daysRemaining: number;
  daysLimit: number;
  deprovisionAt?: string;
  actions: PlanAction[];
}

/** Trial or subscription expired — grace period before deprovision */
export interface ExpiredState {
  status: "expired";
  badge: string;
  badgeIcon?: string;
  daysRemaining: number;
  daysLimit: number;
  deprovisionAt?: string;
  actions: PlanAction[];
}

/** Subscription cancelled — reactivation window open */
export interface CancelledState {
  status: "cancelled";
  badge: string;
  daysRemaining: number;
  daysLimit: number;
  deprovisionAt: string;
  actions: PlanAction[];
}

/** Lapsed subscription — previously held this plan */
export interface InactiveState {
  status: "inactive";
  badge: string;
  deactivatedAt: string;
  previousFeatures: string[];
  actions: PlanAction[];
}

// ---------------------------------------------------------------------------
// Hydrated plan
// A plan definition with computed per-instance state attached.
// This is the shape returned by GET /api/plans/resolved.
// ---------------------------------------------------------------------------

export interface HydratedPlan extends Plan {
  state: PlanState;
}

// ---------------------------------------------------------------------------
// API response shapes
// ---------------------------------------------------------------------------

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
