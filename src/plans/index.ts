/**
 * Artisan Roast Plan SDK
 *
 * TypeScript types and endpoint contract for building plan integrations.
 * Any plan provider — first-party or community — implements this shape.
 *
 * @see https://github.com/yuens1002/artisan-roast-sdk
 */

// Re-export scaffolds so callers can import from the main entry
export { SCENARIOS, SCENARIO_KEYS } from "./scaffolds";

// ---------------------------------------------------------------------------
// Plan details
// ---------------------------------------------------------------------------

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
  quotas?: Array<{ icon: string; slug: string; label: string; limit: number }>;
  benefits?: BenefitsBlock;
  excludes?: string[];
}

// ---------------------------------------------------------------------------
// Confirm action config
// Drives the reason-capture dialog for any workflow (cancel, downgrade, etc.)
// ---------------------------------------------------------------------------

export interface ConfirmActionConfig {
  /** Unique identifier within the plan — PlanAction.modalSlug references this */
  slug: string;
  /** Dialog heading */
  heading: string;
  /** Dialog body copy */
  description: string;
  /** Label for the reason dropdown */
  reasonsLabel: string;
  /** Reason dropdown options */
  reasons: Array<{ value: string; label: string }>;
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
  /** Reason-capture dialog configs. PlanAction.modalSlug references entries by slug. Omit to hide all dialogs. */
  actionModals?: ConfirmActionConfig[];
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
  /** Per-pool action — e.g. "Book 1:1 Session" on the sessions pool. Persists across plan states (add-on credits don't expire). */
  cta?: PlanAction;
}

// ---------------------------------------------------------------------------
// Progress bar
// Rendered as a time-bounded progress bar on trial/expired plan cards.
// Platform computes all values server-side before sending payload.
// ---------------------------------------------------------------------------

export interface ProgressBar {
  /** Lucide icon name shown beside the label (e.g. "clock") */
  icon: string;
  /** Bar label (e.g. "Trial days") */
  label: string;
  /** Current value — the first number shown (e.g. days remaining) */
  value: number;
  /** Maximum value — the second number shown (e.g. total trial days) */
  total: number;
  /** Unit label after the count pair (e.g. "remaining" | "used") */
  countLabel: string;
}

// ---------------------------------------------------------------------------
// Status info
// Optional secondary description line below the badge.
// Platform builds the full sentence at payload time.
// ---------------------------------------------------------------------------

export interface StatusInfo {
  /** Lucide icon name shown beside the description (e.g. "rotate-cw") */
  descIcon?: string;
  /** Full sentence status description (e.g. "Renews on May 28, 2026.") */
  descText?: string;
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
  status: "NONE";
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
  progress: ProgressBar;
  deprovisionAt?: string;
  statusInfo?: StatusInfo;
  actions: PlanAction[];
}

/** Trial or subscription expired — grace period before deprovision */
export interface ExpiredState {
  status: "EXPIRED";
  badge: string;
  badgeIcon?: string;
  progress: ProgressBar;
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
