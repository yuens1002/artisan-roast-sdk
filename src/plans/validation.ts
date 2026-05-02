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
});

export const UsagePoolSchema = z.object({
  slug: z.string(),
  label: z.string(),
  limit: z.number(),
  used: z.number(),
  purchased: z.number().optional(),
});

export const ProgressBarSchema = z.object({
  icon: z.string(),
  label: z.string(),
  value: z.number(),
  total: z.number(),
  countLabel: z.string(),
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
  progress: ProgressBarSchema,
  deprovisionAt: z.string().optional(),
  statusInfo: StatusInfoSchema.optional(),
  actions: z.array(PlanActionSchema),
});

export const ExpiredStateSchema = z.object({
  status: z.literal("EXPIRED"),
  badge: z.string(),
  badgeIcon: z.string().optional(),
  progress: ProgressBarSchema,
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

export const PlanStateSchema = z.discriminatedUnion("status", [
  NoneStateSchema,
  ActiveStateSchema,
  TrialStateSchema,
  ExpiredStateSchema,
  CancelledStateSchema,
  InactiveStateSchema,
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

export const ConfirmActionConfigSchema = z.object({
  slug: z.string(),
  heading: z.string(),
  description: z.string(),
  reasonsLabel: z.string(),
  reasons: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
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
  actionModals: z.array(ConfirmActionConfigSchema).optional(),
});

export const HydratedPlanSchema = PlanSchema.extend({
  state: PlanStateSchema,
}).superRefine((data, ctx) => {
  const modalSlugs = new Set((data.actionModals ?? []).map((m) => m.slug));
  const actions =
    "actions" in data.state ? (data.state.actions as Array<{ slug: string; modalSlug?: string }>) : [];
  for (const action of actions) {
    if (action.modalSlug && !modalSlugs.has(action.modalSlug)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Action "${action.slug}" references modalSlug "${action.modalSlug}" but no matching entry exists in actionModals`,
        path: ["state", "actions"],
      });
    }
  }
});
