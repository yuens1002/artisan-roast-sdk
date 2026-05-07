"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCENARIO_KEYS = exports.SCENARIOS = void 0;
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
const houseBlendTrialModals = [
    {
        slug: "cancel-trial",
        heading: "Cancel your trial?",
        description: "We'd love to know why before you go.",
        reasonsLabel: "Reason for cancelling",
        reasons: trialCancelReasons,
        keepLabel: "Keep trial",
        confirmLabel: "Cancel Trial",
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
const futureDate = (daysFromNow) => new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
const futureDateStr = (daysFromNow) => futureDate(daysFromNow).toISOString();
const pastDateStr = (daysAgo) => new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
const renewalDateStr = (daysFromNow) => futureDate(daysFromNow).toISOString().split("T")[0];
const formatLongDate = (date) => date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const trialBenefits = {
    activeItems: [
        "No billing needed — add card to extend to 30 days",
        "Download your data as a ZIP anytime",
        "100% feature parity from day 1",
        "Cancel anytime — no contract, no commitment",
    ],
};
const houseBlendBenefits = {
    activeItems: [
        "Everything in Community Roast",
        "Managed hosting & backups",
        "Custom domain configuration",
        "5 priority support tickets/month, 48-hr SLA",
    ],
};
exports.SCENARIOS = {
    TRIAL_ACTIVE_NO_CARD: {
        slug: "house-blend-trial",
        name: "House Blend Trial",
        description: "Risk-free for 14 days — full features, no card, no commitment.",
        price: 0,
        currency: "USD",
        interval: "month",
        features: ["hosting", "custom-domain", "trial"],
        details: {
            benefits: trialBenefits,
        },
        highlight: false,
        visibility: "hosted",
        actionModals: houseBlendTrialModals,
        state: {
            status: "TRIAL",
            badge: "Active Trial",
            badgeIcon: "clock",
            progress: {
                icon: "clock",
                label: "Trial days",
                value: 10,
                total: 14,
                countLabel: "remaining",
            },
            actions: [
                {
                    slug: "add-billing",
                    label: "Add Billing",
                    url: "https://buy.stripe.com/test_extend",
                    variant: "primary",
                },
                { slug: "cancel", label: "Cancel Trial", variant: "ghost", modalSlug: "cancel-trial" },
            ],
        },
    },
    TRIAL_ACTIVE_CARD_ADDED: {
        slug: "house-blend-trial",
        name: "House Blend Trial",
        description: "Risk-free for 14 days — full features, no card, no commitment.",
        price: 0,
        currency: "USD",
        interval: "month",
        features: ["hosting", "custom-domain", "trial"],
        details: {
            benefits: trialBenefits,
        },
        highlight: false,
        visibility: "hosted",
        actionModals: houseBlendTrialModals,
        state: {
            status: "TRIAL",
            badge: "Extended Trial",
            badgeIcon: "clock",
            progress: {
                icon: "clock",
                label: "Trial days",
                value: 25,
                total: 30,
                countLabel: "remaining",
            },
            actions: [
                {
                    slug: "add-billing",
                    label: "Add Billing",
                    url: "https://buy.stripe.com/test_extend",
                    variant: "primary",
                    disabled: true,
                    disabledReason: "Billing already on file",
                },
                { slug: "cancel", label: "Cancel Trial", variant: "ghost", modalSlug: "cancel-stripe" },
            ],
        },
    },
    TRIAL_EXPIRED: (() => {
        const deprovisionDate = futureDate(2);
        return {
            slug: "house-blend-trial",
            name: "House Blend Trial",
            description: "Risk-free for 14 days — full features, no card, no commitment.",
            price: 0,
            currency: "USD",
            interval: "month",
            features: ["hosting", "custom-domain", "trial"],
            details: { benefits: trialBenefits },
            highlight: false,
            visibility: "hosted",
            state: {
                status: "EXPIRED",
                badge: "Expired",
                badgeIcon: "clock",
                progress: {
                    icon: "clock",
                    label: "Trial days",
                    value: 0,
                    total: 14,
                    countLabel: "remaining",
                },
                deprovisionAt: deprovisionDate.toISOString(),
                statusInfo: {
                    descIcon: "alert-circle",
                    descText: `Trial ended. Store will be removed on ${formatLongDate(deprovisionDate)}.`,
                },
                actions: [
                    {
                        slug: "subscribe",
                        label: "Subscribe Now",
                        url: "https://buy.stripe.com/test_subscribe",
                        variant: "primary",
                    },
                ],
            },
        };
    })(),
    CONVERTED: {
        slug: "house-blend",
        name: "House Blend",
        description: "Fully managed hosting with custom domain and priority support.",
        price: 7900,
        currency: "USD",
        interval: "month",
        features: ["hosting", "custom-domain", "priority-support", "tickets"],
        details: {
            benefits: houseBlendBenefits,
            sla: { responseTime: "48 hours" },
        },
        highlight: true,
        visibility: "hosted",
        state: {
            status: "ACTIVE",
            badge: "Active",
            badgeIcon: "check-circle-2",
            statusInfo: {
                descIcon: "rotate-cw",
                descText: `Renews on ${renewalDateStr(30)}.`,
            },
            pools: [{ slug: "tickets", label: "Priority Tickets", limit: 5, used: 1 }],
            actions: [
                {
                    slug: "manage-billing",
                    label: "Manage Billing",
                    endpoint: "/api/billing/portal",
                    iconAfter: "external-link",
                    variant: "secondary",
                },
            ],
        },
    },
    DIRECT_SUBSCRIBE: {
        slug: "house-blend",
        name: "House Blend",
        description: "Fully managed hosting with custom domain and priority support.",
        price: 7900,
        currency: "USD",
        interval: "month",
        features: ["hosting", "custom-domain", "priority-support", "tickets"],
        details: {
            benefits: houseBlendBenefits,
            sla: { responseTime: "48 hours" },
        },
        highlight: true,
        visibility: "hosted",
        state: {
            status: "ACTIVE",
            badge: "Active",
            badgeIcon: "check-circle-2",
            statusInfo: {
                descIcon: "rotate-cw",
                descText: `Renews on ${renewalDateStr(30)}.`,
            },
            pools: [{ slug: "tickets", label: "Priority Tickets", limit: 5, used: 0 }],
            actions: [
                {
                    slug: "manage-billing",
                    label: "Manage Billing",
                    endpoint: "/api/billing/portal",
                    iconAfter: "external-link",
                    variant: "secondary",
                },
            ],
        },
    },
    SELF_HOSTED_FREE: {
        slug: "free",
        name: "Community",
        description: "Self-hosted, free forever.",
        price: 0,
        currency: "USD",
        interval: "month",
        features: ["self-hosted"],
        details: {
            benefits: {
                activeItems: [
                    "Full source code access",
                    "Community support",
                    "No usage limits",
                ],
            },
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
    PRIORITY_SUPPORT_NONE: {
        slug: "priority-support",
        name: "Priority Support",
        description: "Dedicated support with guaranteed response times",
        price: 4900,
        currency: "USD",
        interval: "month",
        features: ["priority-support"],
        details: {
            benefits: {
                activeItems: [
                    "Priority email support with 48-hr SLA",
                    "5 support tickets per month",
                    "1 one-on-one session per month (30 min)",
                    "Anonymous GitHub issue tracking & transparency",
                ],
            },
            sla: { responseTime: "48 hours", availability: "Business days (Mon–Fri)" },
            scope: ["Setup & configuration", "Troubleshooting", "Platform guidance"],
            excludes: ["Custom development", "Feature requests", "Third-party integrations"],
            terms: [
                "Billed monthly, cancel anytime",
                "Unused tickets do not roll over",
            ],
        },
        highlight: true,
        visibility: "self-hosted",
        salePrice: 3900,
        saleLabel: "1st 6mos Launch Special",
        saleEndsAt: "2026-06-30T23:59:59Z",
        state: {
            status: "NONE",
            actions: [
                {
                    slug: "subscribe",
                    label: "Get Priority Support",
                    url: "https://buy.stripe.com/test_ps",
                    variant: "primary",
                    iconAfter: "external-link",
                },
            ],
        },
    },
    PRIORITY_SUPPORT_ACTIVE: {
        slug: "priority-support",
        name: "Priority Support",
        description: "Dedicated support with guaranteed response times",
        price: 4900,
        currency: "USD",
        interval: "month",
        features: ["priority-support"],
        details: {
            benefits: {
                activeItems: [
                    "Priority email support with 48-hr SLA",
                    "5 support tickets per month",
                    "1 one-on-one session per month (30 min)",
                    "Anonymous GitHub issue tracking & transparency",
                ],
            },
            sla: { responseTime: "48 hours", availability: "Business days (Mon–Fri)" },
            scope: ["Setup & configuration", "Troubleshooting", "Platform guidance"],
            excludes: ["Custom development", "Feature requests", "Third-party integrations"],
            terms: [
                "Billed monthly, cancel anytime",
                "Unused tickets do not roll over",
            ],
        },
        highlight: true,
        visibility: "self-hosted",
        salePrice: 3900,
        saleLabel: "1st 6mos Launch Special",
        saleEndsAt: "2026-06-30T23:59:59Z",
        actionModals: [
            {
                slug: "cancel-subscription",
                heading: "Cancel your subscription?",
                description: "We'd love to know why before you go.",
                reasonsLabel: "Reason for cancelling",
                reasons: [
                    { value: "too-expensive", label: "Too expensive" },
                    { value: "missing-features", label: "Missing features" },
                    { value: "switching", label: "Switching to another platform" },
                    { value: "no-longer-needed", label: "Don't need it anymore" },
                    { value: "other", label: "Other" },
                ],
                keepLabel: "Keep subscription",
                confirmLabel: "Cancel Subscription",
            },
        ],
        state: {
            status: "ACTIVE",
            badge: "Active",
            badgeIcon: "check-circle-2",
            pools: [
                {
                    slug: "tickets",
                    label: "Priority Tickets",
                    limit: 5,
                    used: 2,
                    cta: {
                        slug: "submit-ticket",
                        label: "Submit Ticket",
                        url: "https://artisanroast.app/support/ticket",
                        variant: "primary",
                    },
                },
                {
                    slug: "one-on-one",
                    label: "1:1 Sessions",
                    limit: 1,
                    used: 0,
                    cta: {
                        slug: "book-session",
                        label: "Book Session",
                        url: "https://calendly.com/artisanroast/session",
                        variant: "secondary",
                    },
                },
            ],
            actions: [
                {
                    slug: "manage-billing",
                    label: "Manage Billing",
                    endpoint: "/api/billing/portal",
                    iconAfter: "external-link",
                    variant: "secondary",
                },
                {
                    slug: "cancel",
                    label: "Cancel Subscription",
                    variant: "ghost",
                    modalSlug: "cancel-subscription",
                },
            ],
        },
    },
    PRIORITY_SUPPORT_INACTIVE: {
        slug: "priority-support",
        name: "Priority Support",
        description: "Dedicated support with guaranteed response times",
        price: 4900,
        currency: "USD",
        interval: "month",
        features: ["priority-support"],
        details: {
            benefits: {
                activeItems: [
                    "Priority email support with 48-hr SLA",
                    "5 support tickets per month",
                    "1 one-on-one session per month (30 min)",
                    "Anonymous GitHub issue tracking & transparency",
                ],
                inactiveHeader: "Renew to get back:",
                inactiveItems: [
                    "Priority email support with 48-hr SLA",
                    "5 support tickets per month",
                    "1 one-on-one session per month (30 min)",
                    "Anonymous GitHub issue tracking & transparency",
                ],
            },
            sla: { responseTime: "48 hours", availability: "Business days (Mon–Fri)" },
            scope: ["Setup & configuration", "Troubleshooting", "Platform guidance"],
            excludes: ["Custom development", "Feature requests", "Third-party integrations"],
            terms: [
                "Billed monthly, cancel anytime",
                "Unused tickets do not roll over",
            ],
        },
        highlight: true,
        visibility: "self-hosted",
        salePrice: 3900,
        saleLabel: "1st 6mos Launch Special",
        saleEndsAt: "2026-06-30T23:59:59Z",
        state: {
            status: "INACTIVE",
            badge: "Inactive",
            badgeIcon: "circle-slash",
            deactivatedAt: pastDateStr(30),
            actions: [
                {
                    slug: "renew",
                    label: "Renew",
                    url: "https://buy.stripe.com/test_ps",
                    variant: "primary",
                    iconAfter: "external-link",
                },
            ],
        },
    },
    SELF_HOSTED_FREE_WITH_ADDONS: {
        slug: "free",
        name: "Community",
        description: "Self-hosted, free forever.",
        price: 0,
        currency: "USD",
        interval: "month",
        features: ["self-hosted"],
        details: {
            benefits: {
                activeItems: [
                    "Full source code access",
                    "Community support",
                    "No usage limits",
                ],
            },
            terms: ["Self-managed infrastructure required"],
        },
        highlight: false,
        visibility: "self-hosted",
        state: {
            status: "ACTIVE",
            badge: "Current Plan",
            badgeIcon: "check-circle-2",
            pools: [
                {
                    slug: "tickets",
                    label: "Priority Tickets",
                    limit: 3,
                    used: 1,
                    purchased: 3,
                    cta: {
                        slug: "submit-ticket",
                        label: "Submit Ticket",
                        url: "https://artisanroast.app/support/ticket",
                        variant: "primary",
                    },
                },
                {
                    slug: "one-on-one",
                    label: "1:1 Sessions",
                    limit: 1,
                    used: 0,
                    purchased: 1,
                    cta: {
                        slug: "book-session",
                        label: "Book Session",
                        url: "https://calendly.com/artisanroast/session",
                        variant: "secondary",
                    },
                },
            ],
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
    INACTIVE: {
        slug: "house-blend",
        name: "House Blend",
        description: "Fully managed hosting with custom domain and priority support.",
        price: 7900,
        currency: "USD",
        interval: "month",
        features: ["hosting", "custom-domain", "priority-support", "tickets"],
        details: {
            benefits: {
                activeItems: houseBlendBenefits.activeItems,
                inactiveHeader: "Renew to get back:",
                inactiveItems: [
                    "Custom domain with SSL",
                    "5 priority support tickets/month",
                    "Managed hosting & backups",
                    "48-hour SLA",
                ],
            },
            sla: { responseTime: "48 hours" },
        },
        highlight: false,
        visibility: "hosted",
        state: {
            status: "INACTIVE",
            badge: "Inactive",
            badgeIcon: "circle-slash",
            deactivatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            statusInfo: {
                descText: "Subscription ended. Renew to restore your store.",
            },
            actions: [
                {
                    slug: "renew",
                    label: "Renew",
                    url: "https://buy.stripe.com/test_subscribe",
                    variant: "primary",
                },
            ],
        },
    },
};
exports.SCENARIO_KEYS = Object.keys(exports.SCENARIOS);
//# sourceMappingURL=scaffolds.js.map