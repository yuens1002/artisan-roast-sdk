import { z } from "zod";

export const PlanActionSchema = z.object({
  slug: z.string(),
  label: z.string(),
  url: z.string().optional(),
  endpoint: z.string().optional(),
  iconBefore: z.string().optional(),
  iconAfter: z.string().optional(),
  variant: z.enum(["primary", "secondary", "ghost", "destructive"]).optional(),
  modalSlug: z.string().optional(),
  disabled: z.boolean().optional(),
  disabledReason: z.string().optional(),
}).superRefine((action, ctx) => {
  if (action.url && action.variant !== "ghost" && !action.iconAfter) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Action "${action.slug}" has url but is missing iconAfter (non-ghost url actions must declare an icon, typically "external-link")`,
    });
  }
});

export const UsagePoolSchema = z.object({
  slug: z.string(),
  label: z.string(),
  limit: z.number(),
  used: z.number(),
  purchased: z.number().optional(),
  icon: z.string().optional(),
  countLabel: z.string().optional(),
  cta: PlanActionSchema.optional(),
});

export const StatusInfoSchema = z.object({
  descIcon: z.string().optional(),
  descText: z.string().optional(),
});

export const NoneStateSchema = z.object({
  status: z.literal("NONE"),
  actions: z.array(PlanActionSchema),
});

export const ActiveStateSchema = z.object({
  status: z.literal("ACTIVE"),
  badge: z.string(),
  badgeIcon: z.string().optional(),
  statusInfo: StatusInfoSchema.optional(),
  pools: z.array(UsagePoolSchema),
  actions: z.array(PlanActionSchema),
});

export const TrialStateSchema = z.object({
  status: z.literal("TRIAL"),
  badge: z.string(),
  badgeIcon: z.string().optional(),
  pools: z.array(UsagePoolSchema),
  deprovisionAt: z.string().optional(),
  statusInfo: StatusInfoSchema.optional(),
  actions: z.array(PlanActionSchema),
});

export const ExpiredStateSchema = z.object({
  status: z.literal("EXPIRED"),
  badge: z.string(),
  badgeIcon: z.string().optional(),
  pools: z.array(UsagePoolSchema),
  deprovisionAt: z.string().optional(),
  statusInfo: StatusInfoSchema.optional(),
  actions: z.array(PlanActionSchema),
});

export const CancelledStateSchema = z.object({
  status: z.literal("CANCELLED"),
  badge: z.string(),
  daysRemaining: z.number(),
  daysLimit: z.number(),
  deprovisionAt: z.string(),
  statusInfo: StatusInfoSchema.optional(),
  actions: z.array(PlanActionSchema),
});

export const InactiveStateSchema = z.object({
  status: z.literal("INACTIVE"),
  badge: z.string(),
  badgeIcon: z.string().optional(),
  deactivatedAt: z.string(),
  statusInfo: StatusInfoSchema.optional(),
  actions: z.array(PlanActionSchema),
});

// PENDING is NONE-shaped: statusInfo + actions, no badge, no pools. `.strict()`
// makes a stray `pools` (or `badge`, etc.) an error rather than silently stripping it.
export const PendingStateSchema = z
  .object({
    status: z.literal("PENDING"),
    statusInfo: StatusInfoSchema.optional(),
    actions: z.array(PlanActionSchema),
  })
  .strict();

export const PlanStateSchema = z.discriminatedUnion("status", [
  NoneStateSchema,
  ActiveStateSchema,
  TrialStateSchema,
  ExpiredStateSchema,
  CancelledStateSchema,
  InactiveStateSchema,
  PendingStateSchema,
]);

export const BenefitsBlockSchema = z.object({
  activeHeader: z.string().optional(),
  activeItems: z.array(z.string()),
  inactiveHeader: z.string().optional(),
  inactiveItems: z.array(z.string()).optional(),
});

export const PlanDetailsSchema = z.object({
  sla: z
    .object({
      availability: z.string().optional(),
      responseTime: z.string().optional(),
      sessionBooking: z.string().optional(),
      sessionDuration: z.string().optional(),
    })
    .optional(),
  scope: z.array(z.string()).optional(),
  terms: z.array(z.string()).optional(),
  quotas: z
    .array(
      z.object({
        icon: z.string(),
        slug: z.string(),
        label: z.string(),
        limit: z.number(),
      })
    )
    .optional(),
  benefits: BenefitsBlockSchema.optional(),
  excludes: z.array(z.string()).optional(),
});

export const FeedbackFormModalSchema = z.object({
  type: z.literal("feedbackForm"),
  slug: z.string(),
  heading: z.string(),
  description: z.string(),
  reasonsLabel: z.string(),
  reasons: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1),
  keepLabel: z.string(),
  confirmLabel: z.string(),
  confirmIcon: z.string().optional(),
  other: z
    .object({
      label: z.string(),
      placeholder: z.string(),
      maxLength: z.number(),
    })
    .optional(),
});

export const PaymentConfirmModalSchema = z.object({
  type: z.literal("paymentConfirm"),
  slug: z.string(),
  heading: z.string(),
  description: z.string().optional(),
  confirmLabel: z.string(),
  processingMessages: z.array(z.string()).min(1),
});

export const ActionModalSchema = z.discriminatedUnion("type", [
  FeedbackFormModalSchema,
  PaymentConfirmModalSchema,
]);

export const PlanSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  currency: z.string(),
  interval: z.enum(["month", "year"]),
  features: z.array(z.string()),
  details: PlanDetailsSchema,
  highlight: z.boolean(),
  visibility: z.enum(["self-hosted", "hosted"]),
  salePrice: z.number().optional(),
  saleEndsAt: z.string().optional(),
  saleLabel: z.string().optional(),
  actionModals: z.array(ActionModalSchema).optional(),
});

export const HydratedPlanSchema = PlanSchema.extend({
  state: PlanStateSchema,
}).superRefine((data, ctx) => {
  const modalSlugs = new Set((data.actionModals ?? []).map((m) => m.slug));

  type ActionLike = { slug: string; modalSlug?: string };
  const stateActions: ActionLike[] =
    "actions" in data.state ? (data.state.actions as ActionLike[]) : [];
  const poolCtas: ActionLike[] =
    "pools" in data.state
      ? (data.state.pools as Array<{ cta?: ActionLike }>).flatMap((p) => (p.cta ? [p.cta] : []))
      : [];

  for (const action of [...stateActions, ...poolCtas]) {
    if (action.modalSlug && !modalSlugs.has(action.modalSlug)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Action "${action.slug}" references modalSlug "${action.modalSlug}" but no matching entry exists in actionModals`,
        path: ["state", "actions"],
      });
    }
  }
});
