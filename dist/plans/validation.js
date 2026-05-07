"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HydratedPlanSchema = exports.PlanSchema = exports.ConfirmActionConfigSchema = exports.PlanDetailsSchema = exports.BenefitsBlockSchema = exports.PlanStateSchema = exports.InactiveStateSchema = exports.CancelledStateSchema = exports.ExpiredStateSchema = exports.TrialStateSchema = exports.ActiveStateSchema = exports.NoneStateSchema = exports.StatusInfoSchema = exports.ProgressBarSchema = exports.UsagePoolSchema = exports.PlanActionSchema = void 0;
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
});
exports.UsagePoolSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    label: zod_1.z.string(),
    limit: zod_1.z.number(),
    used: zod_1.z.number(),
    purchased: zod_1.z.number().optional(),
    cta: exports.PlanActionSchema.optional(),
});
exports.ProgressBarSchema = zod_1.z.object({
    icon: zod_1.z.string(),
    label: zod_1.z.string(),
    value: zod_1.z.number(),
    total: zod_1.z.number(),
    countLabel: zod_1.z.string(),
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
    progress: exports.ProgressBarSchema,
    deprovisionAt: zod_1.z.string().optional(),
    statusInfo: exports.StatusInfoSchema.optional(),
    actions: zod_1.z.array(exports.PlanActionSchema),
});
exports.ExpiredStateSchema = zod_1.z.object({
    status: zod_1.z.literal("EXPIRED"),
    badge: zod_1.z.string(),
    badgeIcon: zod_1.z.string().optional(),
    progress: exports.ProgressBarSchema,
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
exports.PlanStateSchema = zod_1.z.discriminatedUnion("status", [
    exports.NoneStateSchema,
    exports.ActiveStateSchema,
    exports.TrialStateSchema,
    exports.ExpiredStateSchema,
    exports.CancelledStateSchema,
    exports.InactiveStateSchema,
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
exports.ConfirmActionConfigSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    heading: zod_1.z.string(),
    description: zod_1.z.string(),
    reasonsLabel: zod_1.z.string(),
    reasons: zod_1.z.array(zod_1.z.object({
        value: zod_1.z.string(),
        label: zod_1.z.string(),
    })),
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
    actionModals: zod_1.z.array(exports.ConfirmActionConfigSchema).optional(),
});
exports.HydratedPlanSchema = exports.PlanSchema.extend({
    state: exports.PlanStateSchema,
}).superRefine((data, ctx) => {
    const modalSlugs = new Set((data.actionModals ?? []).map((m) => m.slug));
    const actions = "actions" in data.state ? data.state.actions : [];
    for (const action of actions) {
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