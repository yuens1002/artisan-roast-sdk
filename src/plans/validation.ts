import { z } from "zod";

export const PlanActionSchema = z.object({
  slug: z.string(),
  label: z.string(),
  url: z.string().optional(),
  endpoint: z.string().optional(),
  icon: z.string().optional(),
  variant: z.enum(["primary", "secondary", "ghost", "destructive"]).optional(),
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

export const NoneStateSchema = z.object({
  status: z.literal("NONE"),
  actions: z.array(PlanActionSchema),
});

export const ActiveStateSchema = z.object({
  status: z.literal("ACTIVE"),
  badge: z.string(),
  badgeIcon: z.string().optional(),
  renewalDate: z.string().optional(),
  pools: z.array(UsagePoolSchema),
  actions: z.array(PlanActionSchema),
});

export const TrialStateSchema = z.object({
  status: z.literal("TRIAL"),
  badge: z.string(),
  badgeIcon: z.string().optional(),
  daysRemaining: z.number(),
  daysLimit: z.number(),
  deprovisionAt: z.string().optional(),
  actions: z.array(PlanActionSchema),
});

export const ExpiredStateSchema = z.object({
  status: z.literal("EXPIRED"),
  badge: z.string(),
  badgeIcon: z.string().optional(),
  daysRemaining: z.number(),
  daysLimit: z.number(),
  deprovisionAt: z.string().optional(),
  actions: z.array(PlanActionSchema),
});

export const CancelledStateSchema = z.object({
  status: z.literal("CANCELLED"),
  badge: z.string(),
  daysRemaining: z.number(),
  daysLimit: z.number(),
  deprovisionAt: z.string(),
  actions: z.array(PlanActionSchema),
});

export const InactiveStateSchema = z.object({
  status: z.literal("INACTIVE"),
  badge: z.string(),
  deactivatedAt: z.string(),
  previousFeatures: z.array(z.string()),
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
  benefits: z.array(z.string()).optional(),
  excludes: z.array(z.string()).optional(),
});

export const ConfirmActionConfigSchema = z.object({
  heading: z.string(),
  description: z.string(),
  reasons: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  keepLabel: z.string(),
  confirmLabel: z.string(),
  confirmIcon: z.string().optional(),
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
  actionModal: ConfirmActionConfigSchema.optional(),
});

export const HydratedPlanSchema = PlanSchema.extend({
  state: PlanStateSchema,
});
