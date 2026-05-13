"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydratedPlanSchema = exports.PlanSchema = exports.ActionModalSchema = exports.PaymentConfirmModalSchema = exports.FeedbackFormModalSchema = exports.PlanDetailsSchema = exports.BenefitsBlockSchema = exports.PlanStateSchema = exports.PendingStateSchema = exports.InactiveStateSchema = exports.CancelledStateSchema = exports.ExpiredStateSchema = exports.TrialStateSchema = exports.ActiveStateSchema = exports.NoneStateSchema = exports.StatusInfoSchema = exports.UsagePoolSchema = exports.PlanActionSchema = void 0;
const zod_1 = require("zod");
exports.PlanActionSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    label: zod_1.z.string(),
    url: zod_1.z.string().optional(),
    endpoint: zod_1.z.string().optional(),
    iconBefore: zod_1.z.string().optional(),
    iconAfter: zod_1.z.string().optional(),
    variant: zod_1.z.enum(["primary", "secondary", "ghost", "destructive"]).optional(),
    modalSlug: zod_1.z.string().optional(),
    disabled: zod_1.z.boolean().optional(),
    disabledReason: zod_1.z.string().optional(),
}).superRefine((action, ctx) => {
    if (action.url && action.variant !== "ghost" && !action.iconAfter) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: `Action "${action.slug}" has url but is missing iconAfter (non-ghost url actions must declare an icon, typically "external-link")`,
        });
    }
});
exports.UsagePoolSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    label: zod_1.z.string(),
    limit: zod_1.z.number(),
    used: zod_1.z.number(),
    purchased: zod_1.z.number().optional(),
    icon: zod_1.z.string().optional(),
    countLabel: zod_1.z.string().optional(),
    cta: exports.PlanActionSchema.optional(),
});
exports.StatusInfoSchema = zod_1.z.object({
    descIcon: zod_1.z.string().optional(),
    descText: zod_1.z.string().optional(),
});
exports.NoneStateSchema = zod_1.z.object({
    status: zod_1.z.literal("NONE"),
    actions: zod_1.z.array(exports.PlanActionSchema),
});
exports.ActiveStateSchema = zod_1.z.object({
    status: zod_1.z.literal("ACTIVE"),
    badge: zod_1.z.string(),
    badgeIcon: zod_1.z.string().optional(),
    statusInfo: exports.StatusInfoSchema.optional(),
    pools: zod_1.z.array(exports.UsagePoolSchema),
    actions: zod_1.z.array(exports.PlanActionSchema),
});
exports.TrialStateSchema = zod_1.z.object({
    status: zod_1.z.literal("TRIAL"),
    badge: zod_1.z.string(),
    badgeIcon: zod_1.z.string().optional(),
    pools: zod_1.z.array(exports.UsagePoolSchema),
    deprovisionAt: zod_1.z.string().optional(),
    statusInfo: exports.StatusInfoSchema.optional(),
    actions: zod_1.z.array(exports.PlanActionSchema),
});
exports.ExpiredStateSchema = zod_1.z.object({
    status: zod_1.z.literal("EXPIRED"),
    badge: zod_1.z.string(),
    badgeIcon: zod_1.z.string().optional(),
    pools: zod_1.z.array(exports.UsagePoolSchema),
    deprovisionAt: zod_1.z.string().optional(),
    statusInfo: exports.StatusInfoSchema.optional(),
    actions: zod_1.z.array(exports.PlanActionSchema),
});
exports.CancelledStateSchema = zod_1.z.object({
    status: zod_1.z.literal("CANCELLED"),
    badge: zod_1.z.string(),
    daysRemaining: zod_1.z.number(),
    daysLimit: zod_1.z.number(),
    deprovisionAt: zod_1.z.string(),
    statusInfo: exports.StatusInfoSchema.optional(),
    actions: zod_1.z.array(exports.PlanActionSchema),
});
exports.InactiveStateSchema = zod_1.z.object({
    status: zod_1.z.literal("INACTIVE"),
    badge: zod_1.z.string(),
    badgeIcon: zod_1.z.string().optional(),
    deactivatedAt: zod_1.z.string(),
    statusInfo: exports.StatusInfoSchema.optional(),
    actions: zod_1.z.array(exports.PlanActionSchema),
});
// PENDING is NONE-shaped: statusInfo + actions, no badge, no pools. `.strict()`
// makes a stray `pools` (or `badge`, etc.) an error rather than silently stripping it.
exports.PendingStateSchema = zod_1.z
    .object({
    status: zod_1.z.literal("PENDING"),
    statusInfo: exports.StatusInfoSchema.optional(),
    actions: zod_1.z.array(exports.PlanActionSchema),
})
    .strict();
exports.PlanStateSchema = zod_1.z.discriminatedUnion("status", [
    exports.NoneStateSchema,
    exports.ActiveStateSchema,
    exports.TrialStateSchema,
    exports.ExpiredStateSchema,
    exports.CancelledStateSchema,
    exports.InactiveStateSchema,
    exports.PendingStateSchema,
]);
exports.BenefitsBlockSchema = zod_1.z.object({
    activeHeader: zod_1.z.string().optional(),
    activeItems: zod_1.z.array(zod_1.z.string()),
    inactiveHeader: zod_1.z.string().optional(),
    inactiveItems: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.PlanDetailsSchema = zod_1.z.object({
    sla: zod_1.z
        .object({
        availability: zod_1.z.string().optional(),
        responseTime: zod_1.z.string().optional(),
        sessionBooking: zod_1.z.string().optional(),
        sessionDuration: zod_1.z.string().optional(),
    })
        .optional(),
    scope: zod_1.z.array(zod_1.z.string()).optional(),
    terms: zod_1.z.array(zod_1.z.string()).optional(),
    quotas: zod_1.z
        .array(zod_1.z.object({
        icon: zod_1.z.string(),
        slug: zod_1.z.string(),
        label: zod_1.z.string(),
        limit: zod_1.z.number(),
    }))
        .optional(),
    benefits: exports.BenefitsBlockSchema.optional(),
    excludes: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.FeedbackFormModalSchema = zod_1.z.object({
    type: zod_1.z.literal("feedbackForm"),
    slug: zod_1.z.string(),
    heading: zod_1.z.string(),
    description: zod_1.z.string(),
    reasonsLabel: zod_1.z.string(),
    reasons: zod_1.z
        .array(zod_1.z.object({
        value: zod_1.z.string(),
        label: zod_1.z.string(),
    }))
        .min(1),
    keepLabel: zod_1.z.string(),
    confirmLabel: zod_1.z.string(),
    confirmIcon: zod_1.z.string().optional(),
    other: zod_1.z
        .object({
        label: zod_1.z.string(),
        placeholder: zod_1.z.string(),
        maxLength: zod_1.z.number(),
    })
        .optional(),
});
exports.PaymentConfirmModalSchema = zod_1.z.object({
    type: zod_1.z.literal("paymentConfirm"),
    slug: zod_1.z.string(),
    heading: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    confirmLabel: zod_1.z.string(),
    processingMessages: zod_1.z.array(zod_1.z.string()).min(1),
});
exports.ActionModalSchema = zod_1.z.discriminatedUnion("type", [
    exports.FeedbackFormModalSchema,
    exports.PaymentConfirmModalSchema,
]);
exports.PlanSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    currency: zod_1.z.string(),
    interval: zod_1.z.enum(["month", "year"]),
    features: zod_1.z.array(zod_1.z.string()),
    details: exports.PlanDetailsSchema,
    highlight: zod_1.z.boolean(),
    visibility: zod_1.z.enum(["self-hosted", "hosted"]),
    salePrice: zod_1.z.number().optional(),
    saleEndsAt: zod_1.z.string().optional(),
    saleLabel: zod_1.z.string().optional(),
    actionModals: zod_1.z.array(exports.ActionModalSchema).optional(),
});
exports.HydratedPlanSchema = exports.PlanSchema.extend({
    state: exports.PlanStateSchema,
}).superRefine((data, ctx) => {
    const modalSlugs = new Set((data.actionModals ?? []).map((m) => m.slug));
    const stateActions = "actions" in data.state ? data.state.actions : [];
    const poolCtas = "pools" in data.state
        ? data.state.pools.flatMap((p) => (p.cta ? [p.cta] : []))
        : [];
    for (const action of [...stateActions, ...poolCtas]) {
        if (action.modalSlug && !modalSlugs.has(action.modalSlug)) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: `Action "${action.slug}" references modalSlug "${action.modalSlug}" but no matching entry exists in actionModals`,
                path: ["state", "actions"],
            });
        }
    }
});
//# sourceMappingURL=validation.js.map