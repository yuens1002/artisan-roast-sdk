import { z } from "zod";
export { ALACARTE_SCENARIOS, ALACARTE_SCENARIO_KEYS } from "./scaffolds.js";
export interface AlaCartePool {
    slug: string;
    label: string;
    quantity: number;
}
export interface AlaCartePackage {
    id: string;
    label: string;
    description: string;
    price: string;
    checkoutUrl: string;
    pools: AlaCartePool[];
}
export interface AddOnsResponse {
    packages: AlaCartePackage[];
}
export type CheckoutRequest = {
    planSlug: string;
    customerEmail?: string;
    instanceId?: string;
    callbackUrl?: string;
    trial?: boolean;
} | {
    alaCarteSlug: string;
    customerEmail: string;
    instanceId?: string;
    callbackUrl?: string;
};
export interface CheckoutResponse {
    url: string;
}
export declare const AlaCartePoolSchema: z.ZodObject<{
    slug: z.ZodString;
    label: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    slug: string;
    label: string;
    quantity: number;
}, {
    slug: string;
    label: string;
    quantity: number;
}>;
export declare const AlaCartePackageSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    description: z.ZodString;
    price: z.ZodString;
    checkoutUrl: z.ZodString;
    pools: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        quantity: number;
    }, {
        slug: string;
        label: string;
        quantity: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pools: {
        slug: string;
        label: string;
        quantity: number;
    }[];
    label: string;
    id: string;
    description: string;
    price: string;
    checkoutUrl: string;
}, {
    pools: {
        slug: string;
        label: string;
        quantity: number;
    }[];
    label: string;
    id: string;
    description: string;
    price: string;
    checkoutUrl: string;
}>;
export declare const AddOnsResponseSchema: z.ZodObject<{
    packages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        description: z.ZodString;
        price: z.ZodString;
        checkoutUrl: z.ZodString;
        pools: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            label: z.ZodString;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            quantity: number;
        }, {
            slug: string;
            label: string;
            quantity: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        pools: {
            slug: string;
            label: string;
            quantity: number;
        }[];
        label: string;
        id: string;
        description: string;
        price: string;
        checkoutUrl: string;
    }, {
        pools: {
            slug: string;
            label: string;
            quantity: number;
        }[];
        label: string;
        id: string;
        description: string;
        price: string;
        checkoutUrl: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    packages: {
        pools: {
            slug: string;
            label: string;
            quantity: number;
        }[];
        label: string;
        id: string;
        description: string;
        price: string;
        checkoutUrl: string;
    }[];
}, {
    packages: {
        pools: {
            slug: string;
            label: string;
            quantity: number;
        }[];
        label: string;
        id: string;
        description: string;
        price: string;
        checkoutUrl: string;
    }[];
}>;
export declare const CheckoutResponseSchema: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
}, {
    url: string;
}>;
//# sourceMappingURL=index.d.ts.map