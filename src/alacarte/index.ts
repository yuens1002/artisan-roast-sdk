import { z } from "zod";

export { ALACARTE_SCENARIOS, ALACARTE_SCENARIO_KEYS } from "./scaffolds.js";

// ---------------------------------------------------------------------------
// À La Carte pool
// Describes what a package grants — NOT live usage state.
// Distinct from UsagePool: no used/limit/purchased/icon/countLabel/cta.
// ---------------------------------------------------------------------------

export interface AlaCartePool {
  slug: string;
  label: string;
  quantity: number;
}

// ---------------------------------------------------------------------------
// À La Carte package
// One entry returned by GET /api/add-ons.
// price is a formatted string ("$39") — the platform formats before emitting.
// ---------------------------------------------------------------------------

export interface AlaCartePackage {
  id: string;
  label: string;
  description: string;
  price: string;
  checkoutUrl: string;
  pools: AlaCartePool[];
}

// ---------------------------------------------------------------------------
// Add-ons response
// Shape returned by GET /api/add-ons (public, unauthenticated).
// ---------------------------------------------------------------------------

export interface AddOnsResponse {
  packages: AlaCartePackage[];
}

// ---------------------------------------------------------------------------
// Checkout request
// Discriminated union for POST /api/checkout.
// planSlug variant: plan subscription.
// alaCarteSlug variant: à la carte one-time purchase.
// The two variants are mutually exclusive — assigning both keys is a type error.
// ---------------------------------------------------------------------------

export type CheckoutRequest =
  | {
      planSlug: string;
      customerEmail?: string;
      instanceId?: string;
      callbackUrl?: string;
      trial?: boolean;
    }
  | {
      alaCarteSlug: string;
      customerEmail: string;
      instanceId?: string;
      callbackUrl?: string;
    };

// ---------------------------------------------------------------------------
// Checkout response
// Shape returned by POST /api/checkout (both variants).
// ---------------------------------------------------------------------------

export interface CheckoutResponse {
  url: string;
}

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

export const AlaCartePoolSchema = z.object({
  slug: z.string(),
  label: z.string(),
  quantity: z.number(),
});

export const AlaCartePackageSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  price: z.string(),
  checkoutUrl: z.string(),
  pools: z.array(AlaCartePoolSchema),
});

export const AddOnsResponseSchema = z.object({
  packages: z.array(AlaCartePackageSchema),
});

export const CheckoutResponseSchema = z.object({
  url: z.string(),
});
