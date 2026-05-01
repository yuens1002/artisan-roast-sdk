import type { ConfirmActionConfig, HydratedPlan } from "./index.js";

const trialCancelReasons = [
  { value: "too-soon", label: "Still evaluating — need more time" },
  { value: "missing-features", label: "Missing features I need" },
  { value: "too-expensive", label: "Plan too expensive" },
  { value: "switching", label: "Switching to another platform" },
  { value: "other", label: "Other" },
];

const trialCancelOther = {
  label: "Tell us a bit more",
  placeholder: "What are we missing?",
  maxLength: 500,
};

const houseBlendTrialModals: ConfirmActionConfig[] = [
  {
    slug: "cancel-trial",
    heading: "Cancel your trial?",
    description: "We'd love to know why before you go.",
    reasonsLabel: "Reason for cancelling",
    reasons: trialCancelReasons,
    keepLabel: "Keep trial",
    confirmLabel: "Cancel trial",
    other: trialCancelOther,
  },
  {
    slug: "cancel-stripe",
    heading: "Cancel your trial?",
    description: "Your card is on file. Cancel to stop any future charges.",
    reasonsLabel: "Reason for cancelling",
    reasons: trialCancelReasons,
    keepLabel: "Keep trial",
    confirmLabel: "Continue to Stripe",
    confirmIcon: "external-link",
    other: trialCancelOther,
  },
];

const futureDateStr = (daysFromNow: number): string =>
  new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000).toISOString();

const renewalDateStr = (daysFromNow: number): string =>
  new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]!;

export const SCENARIOS: Record<string, HydratedPlan> = {
  TRIAL_ACTIVE_NO_CARD: {
    slug: "house-blend-trial",
    name: "House Blend Trial",
    description: "Risk-free for 14 days — full hosting, no card, no commitment.",
    price: 0,
    currency: "USD",
    interval: "month",
    features: ["hosting", "custom-domain", "trial"],
    details: {
      benefits: [
        "No billing needed — or add billing to extend your trial up to 30 days",
        "You own your trial data — download a ZIP anytime during the trial",
        "100% feature parity from day 1",
        "Cancel anytime — no contract, no commitment",
      ],
    },
    highlight: false,
    visibility: "hosted",
    actionModals: houseBlendTrialModals,
    state: {
      status: "TRIAL",
      badge: "Active Trial",
      badgeIcon: "clock",
      daysRemaining: 10,
      daysLimit: 14,
      actions: [
        {
          slug: "add-billing",
          label: "Add Billing",
          url: "https://buy.stripe.com/test_extend",
          variant: "primary",
        },
        { slug: "cancel", label: "Cancel", variant: "ghost", modalSlug: "cancel-trial" },
      ],
    },
  },

  TRIAL_ACTIVE_CARD_ADDED: {
    slug: "house-blend-trial",
    name: "House Blend Trial",
    description: "Risk-free for 14 days — full hosting, no card, no commitment.",
    price: 0,
    currency: "USD",
    interval: "month",
    features: ["hosting", "custom-domain", "trial"],
    details: {
      benefits: [
        "No billing needed — or add billing to extend your trial up to 30 days",
        "You own your trial data — download a ZIP anytime during the trial",
        "100% feature parity from day 1",
        "Cancel anytime — no contract, no commitment",
      ],
    },
    highlight: false,
    visibility: "hosted",
    actionModals: houseBlendTrialModals,
    state: {
      status: "TRIAL",
      badge: "Extended Trial",
      badgeIcon: "clock",
      daysRemaining: 25,
      daysLimit: 30,
      actions: [
        {
          slug: "add-billing",
          label: "Add Billing",
          url: "https://buy.stripe.com/test_extend",
          variant: "primary",
          disabled: true,
          disabledReason: "Billing already on file",
        },
        { slug: "cancel", label: "Cancel", variant: "ghost", modalSlug: "cancel-stripe" },
      ],
    },
  },

  TRIAL_EXPIRED: {
    slug: "house-blend-trial",
    name: "House Blend Trial",
    description: "Risk-free for 14 days — full hosting, no card, no commitment.",
    price: 0,
    currency: "USD",
    interval: "month",
    features: ["hosting", "custom-domain", "trial"],
    details: {},
    highlight: false,
    visibility: "hosted",
    state: {
      status: "EXPIRED",
      badge: "Expired",
      badgeIcon: "clock",
      daysRemaining: 0,
      daysLimit: 14,
      deprovisionAt: futureDateStr(16),
      actions: [
        {
          slug: "subscribe",
          label: "Subscribe Now",
          url: "https://buy.stripe.com/test_subscribe",
          variant: "primary",
        },
      ],
    },
  },

  CONVERTED: {
    slug: "house-blend",
    name: "House Blend",
    description: "Full managed hosting with priority support included.",
    price: 4900,
    currency: "USD",
    interval: "month",
    features: ["hosting", "custom-domain", "priority-support", "tickets"],
    details: {
      benefits: [
        "Custom domain with SSL",
        "5 priority support tickets/month, 48-hr SLA",
        "Automatic backups and updates",
        "Managed infrastructure",
      ],
      sla: { responseTime: "48 hours" },
    },
    highlight: true,
    visibility: "hosted",
    state: {
      status: "ACTIVE",
      badge: "Active",
      badgeIcon: "check-circle-2",
      renewalDate: renewalDateStr(30),
      pools: [{ slug: "tickets", label: "Priority Tickets", limit: 5, used: 1 }],
      actions: [
        {
          slug: "manage-billing",
          label: "Manage Billing",
          endpoint: "/api/billing/portal",
          icon: "external-link",
          variant: "secondary",
        },
      ],
    },
  },

  DIRECT_SUBSCRIBE: {
    slug: "house-blend",
    name: "House Blend",
    description: "Full managed hosting with priority support included.",
    price: 4900,
    currency: "USD",
    interval: "month",
    features: ["hosting", "custom-domain", "priority-support", "tickets"],
    details: {
      benefits: [
        "Custom domain with SSL",
        "5 priority support tickets/month, 48-hr SLA",
        "Automatic backups and updates",
        "Managed infrastructure",
      ],
      sla: { responseTime: "48 hours" },
    },
    highlight: true,
    visibility: "hosted",
    state: {
      status: "ACTIVE",
      badge: "Active",
      badgeIcon: "check-circle-2",
      renewalDate: renewalDateStr(30),
      pools: [{ slug: "tickets", label: "Priority Tickets", limit: 5, used: 0 }],
      actions: [
        {
          slug: "manage-billing",
          label: "Manage Billing",
          endpoint: "/api/billing/portal",
          icon: "external-link",
          variant: "secondary",
        },
      ],
    },
  },

  SELF_HOSTED_FREE: {
    slug: "community",
    name: "Community",
    description: "Self-hosted, free forever.",
    price: 0,
    currency: "USD",
    interval: "month",
    features: ["self-hosted"],
    details: {
      benefits: [
        "Full source code access",
        "Community support",
        "No usage limits",
      ],
      terms: ["Self-managed infrastructure required"],
    },
    highlight: false,
    visibility: "self-hosted",
    state: {
      status: "ACTIVE",
      badge: "Current Plan",
      badgeIcon: "check-circle-2",
      pools: [],
      actions: [
        {
          slug: "view-terms",
          label: "View Terms",
          url: "/admin/support/terms",
          variant: "ghost",
        },
      ],
    },
  },
};

export const SCENARIO_KEYS = Object.keys(SCENARIOS);
