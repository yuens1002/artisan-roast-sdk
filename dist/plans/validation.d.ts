import { z } from "zod";
export declare const PlanActionSchema: z.ZodObject<{
    slug: z.ZodString;
    label: z.ZodString;
    url: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodOptional<z.ZodString>;
    iconBefore: z.ZodOptional<z.ZodString>;
    iconAfter: z.ZodOptional<z.ZodString>;
    variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
    modalSlug: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
    disabledReason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    label: string;
    url?: string | undefined;
    variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
    endpoint?: string | undefined;
    iconBefore?: string | undefined;
    iconAfter?: string | undefined;
    modalSlug?: string | undefined;
    disabled?: boolean | undefined;
    disabledReason?: string | undefined;
}, {
    slug: string;
    label: string;
    url?: string | undefined;
    variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
    endpoint?: string | undefined;
    iconBefore?: string | undefined;
    iconAfter?: string | undefined;
    modalSlug?: string | undefined;
    disabled?: boolean | undefined;
    disabledReason?: string | undefined;
}>;
export declare const UsagePoolSchema: z.ZodObject<{
    slug: z.ZodString;
    label: z.ZodString;
    limit: z.ZodNumber;
    used: z.ZodNumber;
    purchased: z.ZodOptional<z.ZodNumber>;
    cta: z.ZodOptional<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    label: string;
    limit: number;
    used: number;
    purchased?: number | undefined;
    cta?: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    } | undefined;
}, {
    slug: string;
    label: string;
    limit: number;
    used: number;
    purchased?: number | undefined;
    cta?: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    } | undefined;
}>;
export declare const ProgressBarSchema: z.ZodObject<{
    icon: z.ZodString;
    label: z.ZodString;
    value: z.ZodNumber;
    total: z.ZodNumber;
    countLabel: z.ZodString;
}, "strip", z.ZodTypeAny, {
    label: string;
    value: number;
    icon: string;
    total: number;
    countLabel: string;
}, {
    label: string;
    value: number;
    icon: string;
    total: number;
    countLabel: string;
}>;
export declare const StatusInfoSchema: z.ZodObject<{
    descIcon: z.ZodOptional<z.ZodString>;
    descText: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    descIcon?: string | undefined;
    descText?: string | undefined;
}, {
    descIcon?: string | undefined;
    descText?: string | undefined;
}>;
export declare const NoneStateSchema: z.ZodObject<{
    status: z.ZodLiteral<"NONE">;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    status: "NONE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
}, {
    status: "NONE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
}>;
export declare const ActiveStateSchema: z.ZodObject<{
    status: z.ZodLiteral<"ACTIVE">;
    badge: z.ZodString;
    badgeIcon: z.ZodOptional<z.ZodString>;
    statusInfo: z.ZodOptional<z.ZodObject<{
        descIcon: z.ZodOptional<z.ZodString>;
        descText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }>>;
    pools: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        limit: z.ZodNumber;
        used: z.ZodNumber;
        purchased: z.ZodOptional<z.ZodNumber>;
        cta: z.ZodOptional<z.ZodObject<{
            slug: z.ZodString;
            label: z.ZodString;
            url: z.ZodOptional<z.ZodString>;
            endpoint: z.ZodOptional<z.ZodString>;
            iconBefore: z.ZodOptional<z.ZodString>;
            iconAfter: z.ZodOptional<z.ZodString>;
            variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
            modalSlug: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodBoolean>;
            disabledReason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        limit: number;
        used: number;
        purchased?: number | undefined;
        cta?: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        } | undefined;
    }, {
        slug: string;
        label: string;
        limit: number;
        used: number;
        purchased?: number | undefined;
        cta?: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        } | undefined;
    }>, "many">;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    badge: string;
    pools: {
        slug: string;
        label: string;
        limit: number;
        used: number;
        purchased?: number | undefined;
        cta?: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        } | undefined;
    }[];
    status: "ACTIVE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}, {
    badge: string;
    pools: {
        slug: string;
        label: string;
        limit: number;
        used: number;
        purchased?: number | undefined;
        cta?: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        } | undefined;
    }[];
    status: "ACTIVE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}>;
export declare const TrialStateSchema: z.ZodObject<{
    status: z.ZodLiteral<"TRIAL">;
    badge: z.ZodString;
    badgeIcon: z.ZodOptional<z.ZodString>;
    progress: z.ZodObject<{
        icon: z.ZodString;
        label: z.ZodString;
        value: z.ZodNumber;
        total: z.ZodNumber;
        countLabel: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    }, {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    }>;
    deprovisionAt: z.ZodOptional<z.ZodString>;
    statusInfo: z.ZodOptional<z.ZodObject<{
        descIcon: z.ZodOptional<z.ZodString>;
        descText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }>>;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    badge: string;
    progress: {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    };
    status: "TRIAL";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    deprovisionAt?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}, {
    badge: string;
    progress: {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    };
    status: "TRIAL";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    deprovisionAt?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}>;
export declare const ExpiredStateSchema: z.ZodObject<{
    status: z.ZodLiteral<"EXPIRED">;
    badge: z.ZodString;
    badgeIcon: z.ZodOptional<z.ZodString>;
    progress: z.ZodObject<{
        icon: z.ZodString;
        label: z.ZodString;
        value: z.ZodNumber;
        total: z.ZodNumber;
        countLabel: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    }, {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    }>;
    deprovisionAt: z.ZodOptional<z.ZodString>;
    statusInfo: z.ZodOptional<z.ZodObject<{
        descIcon: z.ZodOptional<z.ZodString>;
        descText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }>>;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    badge: string;
    progress: {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    };
    status: "EXPIRED";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    deprovisionAt?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}, {
    badge: string;
    progress: {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    };
    status: "EXPIRED";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    deprovisionAt?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}>;
export declare const CancelledStateSchema: z.ZodObject<{
    status: z.ZodLiteral<"CANCELLED">;
    badge: z.ZodString;
    daysRemaining: z.ZodNumber;
    daysLimit: z.ZodNumber;
    deprovisionAt: z.ZodString;
    statusInfo: z.ZodOptional<z.ZodObject<{
        descIcon: z.ZodOptional<z.ZodString>;
        descText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }>>;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    badge: string;
    deprovisionAt: string;
    status: "CANCELLED";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    daysRemaining: number;
    daysLimit: number;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}, {
    badge: string;
    deprovisionAt: string;
    status: "CANCELLED";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    daysRemaining: number;
    daysLimit: number;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}>;
export declare const InactiveStateSchema: z.ZodObject<{
    status: z.ZodLiteral<"INACTIVE">;
    badge: z.ZodString;
    badgeIcon: z.ZodOptional<z.ZodString>;
    deactivatedAt: z.ZodString;
    statusInfo: z.ZodOptional<z.ZodObject<{
        descIcon: z.ZodOptional<z.ZodString>;
        descText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }>>;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    badge: string;
    deactivatedAt: string;
    status: "INACTIVE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}, {
    badge: string;
    deactivatedAt: string;
    status: "INACTIVE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}>;
export declare const PlanStateSchema: z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
    status: z.ZodLiteral<"NONE">;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    status: "NONE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
}, {
    status: "NONE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
}>, z.ZodObject<{
    status: z.ZodLiteral<"ACTIVE">;
    badge: z.ZodString;
    badgeIcon: z.ZodOptional<z.ZodString>;
    statusInfo: z.ZodOptional<z.ZodObject<{
        descIcon: z.ZodOptional<z.ZodString>;
        descText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }>>;
    pools: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        limit: z.ZodNumber;
        used: z.ZodNumber;
        purchased: z.ZodOptional<z.ZodNumber>;
        cta: z.ZodOptional<z.ZodObject<{
            slug: z.ZodString;
            label: z.ZodString;
            url: z.ZodOptional<z.ZodString>;
            endpoint: z.ZodOptional<z.ZodString>;
            iconBefore: z.ZodOptional<z.ZodString>;
            iconAfter: z.ZodOptional<z.ZodString>;
            variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
            modalSlug: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodBoolean>;
            disabledReason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        limit: number;
        used: number;
        purchased?: number | undefined;
        cta?: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        } | undefined;
    }, {
        slug: string;
        label: string;
        limit: number;
        used: number;
        purchased?: number | undefined;
        cta?: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        } | undefined;
    }>, "many">;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    badge: string;
    pools: {
        slug: string;
        label: string;
        limit: number;
        used: number;
        purchased?: number | undefined;
        cta?: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        } | undefined;
    }[];
    status: "ACTIVE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}, {
    badge: string;
    pools: {
        slug: string;
        label: string;
        limit: number;
        used: number;
        purchased?: number | undefined;
        cta?: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        } | undefined;
    }[];
    status: "ACTIVE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    status: z.ZodLiteral<"TRIAL">;
    badge: z.ZodString;
    badgeIcon: z.ZodOptional<z.ZodString>;
    progress: z.ZodObject<{
        icon: z.ZodString;
        label: z.ZodString;
        value: z.ZodNumber;
        total: z.ZodNumber;
        countLabel: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    }, {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    }>;
    deprovisionAt: z.ZodOptional<z.ZodString>;
    statusInfo: z.ZodOptional<z.ZodObject<{
        descIcon: z.ZodOptional<z.ZodString>;
        descText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }>>;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    badge: string;
    progress: {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    };
    status: "TRIAL";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    deprovisionAt?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}, {
    badge: string;
    progress: {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    };
    status: "TRIAL";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    deprovisionAt?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    status: z.ZodLiteral<"EXPIRED">;
    badge: z.ZodString;
    badgeIcon: z.ZodOptional<z.ZodString>;
    progress: z.ZodObject<{
        icon: z.ZodString;
        label: z.ZodString;
        value: z.ZodNumber;
        total: z.ZodNumber;
        countLabel: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    }, {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    }>;
    deprovisionAt: z.ZodOptional<z.ZodString>;
    statusInfo: z.ZodOptional<z.ZodObject<{
        descIcon: z.ZodOptional<z.ZodString>;
        descText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }>>;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    badge: string;
    progress: {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    };
    status: "EXPIRED";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    deprovisionAt?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}, {
    badge: string;
    progress: {
        label: string;
        value: number;
        icon: string;
        total: number;
        countLabel: string;
    };
    status: "EXPIRED";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    deprovisionAt?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    status: z.ZodLiteral<"CANCELLED">;
    badge: z.ZodString;
    daysRemaining: z.ZodNumber;
    daysLimit: z.ZodNumber;
    deprovisionAt: z.ZodString;
    statusInfo: z.ZodOptional<z.ZodObject<{
        descIcon: z.ZodOptional<z.ZodString>;
        descText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }>>;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    badge: string;
    deprovisionAt: string;
    status: "CANCELLED";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    daysRemaining: number;
    daysLimit: number;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}, {
    badge: string;
    deprovisionAt: string;
    status: "CANCELLED";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    daysRemaining: number;
    daysLimit: number;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    status: z.ZodLiteral<"INACTIVE">;
    badge: z.ZodString;
    badgeIcon: z.ZodOptional<z.ZodString>;
    deactivatedAt: z.ZodString;
    statusInfo: z.ZodOptional<z.ZodObject<{
        descIcon: z.ZodOptional<z.ZodString>;
        descText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }, {
        descIcon?: string | undefined;
        descText?: string | undefined;
    }>>;
    actions: z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        label: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        iconBefore: z.ZodOptional<z.ZodString>;
        iconAfter: z.ZodOptional<z.ZodString>;
        variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
        modalSlug: z.ZodOptional<z.ZodString>;
        disabled: z.ZodOptional<z.ZodBoolean>;
        disabledReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }, {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    badge: string;
    deactivatedAt: string;
    status: "INACTIVE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}, {
    badge: string;
    deactivatedAt: string;
    status: "INACTIVE";
    actions: {
        slug: string;
        label: string;
        url?: string | undefined;
        variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
        endpoint?: string | undefined;
        iconBefore?: string | undefined;
        iconAfter?: string | undefined;
        modalSlug?: string | undefined;
        disabled?: boolean | undefined;
        disabledReason?: string | undefined;
    }[];
    badgeIcon?: string | undefined;
    statusInfo?: {
        descIcon?: string | undefined;
        descText?: string | undefined;
    } | undefined;
}>]>;
export declare const BenefitsBlockSchema: z.ZodObject<{
    activeHeader: z.ZodOptional<z.ZodString>;
    activeItems: z.ZodArray<z.ZodString, "many">;
    inactiveHeader: z.ZodOptional<z.ZodString>;
    inactiveItems: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    activeItems: string[];
    inactiveHeader?: string | undefined;
    activeHeader?: string | undefined;
    inactiveItems?: string[] | undefined;
}, {
    activeItems: string[];
    inactiveHeader?: string | undefined;
    activeHeader?: string | undefined;
    inactiveItems?: string[] | undefined;
}>;
export declare const PlanDetailsSchema: z.ZodObject<{
    sla: z.ZodOptional<z.ZodObject<{
        availability: z.ZodOptional<z.ZodString>;
        responseTime: z.ZodOptional<z.ZodString>;
        sessionBooking: z.ZodOptional<z.ZodString>;
        sessionDuration: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        responseTime?: string | undefined;
        availability?: string | undefined;
        sessionBooking?: string | undefined;
        sessionDuration?: string | undefined;
    }, {
        responseTime?: string | undefined;
        availability?: string | undefined;
        sessionBooking?: string | undefined;
        sessionDuration?: string | undefined;
    }>>;
    scope: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    terms: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    quotas: z.ZodOptional<z.ZodArray<z.ZodObject<{
        icon: z.ZodString;
        slug: z.ZodString;
        label: z.ZodString;
        limit: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        label: string;
        limit: number;
        icon: string;
    }, {
        slug: string;
        label: string;
        limit: number;
        icon: string;
    }>, "many">>;
    benefits: z.ZodOptional<z.ZodObject<{
        activeHeader: z.ZodOptional<z.ZodString>;
        activeItems: z.ZodArray<z.ZodString, "many">;
        inactiveHeader: z.ZodOptional<z.ZodString>;
        inactiveItems: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        activeItems: string[];
        inactiveHeader?: string | undefined;
        activeHeader?: string | undefined;
        inactiveItems?: string[] | undefined;
    }, {
        activeItems: string[];
        inactiveHeader?: string | undefined;
        activeHeader?: string | undefined;
        inactiveItems?: string[] | undefined;
    }>>;
    excludes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    sla?: {
        responseTime?: string | undefined;
        availability?: string | undefined;
        sessionBooking?: string | undefined;
        sessionDuration?: string | undefined;
    } | undefined;
    scope?: string[] | undefined;
    terms?: string[] | undefined;
    quotas?: {
        slug: string;
        label: string;
        limit: number;
        icon: string;
    }[] | undefined;
    benefits?: {
        activeItems: string[];
        inactiveHeader?: string | undefined;
        activeHeader?: string | undefined;
        inactiveItems?: string[] | undefined;
    } | undefined;
    excludes?: string[] | undefined;
}, {
    sla?: {
        responseTime?: string | undefined;
        availability?: string | undefined;
        sessionBooking?: string | undefined;
        sessionDuration?: string | undefined;
    } | undefined;
    scope?: string[] | undefined;
    terms?: string[] | undefined;
    quotas?: {
        slug: string;
        label: string;
        limit: number;
        icon: string;
    }[] | undefined;
    benefits?: {
        activeItems: string[];
        inactiveHeader?: string | undefined;
        activeHeader?: string | undefined;
        inactiveItems?: string[] | undefined;
    } | undefined;
    excludes?: string[] | undefined;
}>;
export declare const ConfirmActionConfigSchema: z.ZodObject<{
    slug: z.ZodString;
    heading: z.ZodString;
    description: z.ZodString;
    reasonsLabel: z.ZodString;
    reasons: z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        label: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        label: string;
        value: string;
    }, {
        label: string;
        value: string;
    }>, "many">;
    keepLabel: z.ZodString;
    confirmLabel: z.ZodString;
    confirmIcon: z.ZodOptional<z.ZodString>;
    other: z.ZodOptional<z.ZodObject<{
        label: z.ZodString;
        placeholder: z.ZodString;
        maxLength: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        label: string;
        placeholder: string;
        maxLength: number;
    }, {
        label: string;
        placeholder: string;
        maxLength: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    heading: string;
    description: string;
    reasonsLabel: string;
    reasons: {
        label: string;
        value: string;
    }[];
    keepLabel: string;
    confirmLabel: string;
    other?: {
        label: string;
        placeholder: string;
        maxLength: number;
    } | undefined;
    confirmIcon?: string | undefined;
}, {
    slug: string;
    heading: string;
    description: string;
    reasonsLabel: string;
    reasons: {
        label: string;
        value: string;
    }[];
    keepLabel: string;
    confirmLabel: string;
    other?: {
        label: string;
        placeholder: string;
        maxLength: number;
    } | undefined;
    confirmIcon?: string | undefined;
}>;
export declare const PlanSchema: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodString;
    interval: z.ZodEnum<["month", "year"]>;
    features: z.ZodArray<z.ZodString, "many">;
    details: z.ZodObject<{
        sla: z.ZodOptional<z.ZodObject<{
            availability: z.ZodOptional<z.ZodString>;
            responseTime: z.ZodOptional<z.ZodString>;
            sessionBooking: z.ZodOptional<z.ZodString>;
            sessionDuration: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        }, {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        }>>;
        scope: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        terms: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        quotas: z.ZodOptional<z.ZodArray<z.ZodObject<{
            icon: z.ZodString;
            slug: z.ZodString;
            label: z.ZodString;
            limit: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }, {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }>, "many">>;
        benefits: z.ZodOptional<z.ZodObject<{
            activeHeader: z.ZodOptional<z.ZodString>;
            activeItems: z.ZodArray<z.ZodString, "many">;
            inactiveHeader: z.ZodOptional<z.ZodString>;
            inactiveItems: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        }, {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        }>>;
        excludes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        sla?: {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        } | undefined;
        scope?: string[] | undefined;
        terms?: string[] | undefined;
        quotas?: {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }[] | undefined;
        benefits?: {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        } | undefined;
        excludes?: string[] | undefined;
    }, {
        sla?: {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        } | undefined;
        scope?: string[] | undefined;
        terms?: string[] | undefined;
        quotas?: {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }[] | undefined;
        benefits?: {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        } | undefined;
        excludes?: string[] | undefined;
    }>;
    highlight: z.ZodBoolean;
    visibility: z.ZodEnum<["self-hosted", "hosted"]>;
    salePrice: z.ZodOptional<z.ZodNumber>;
    saleEndsAt: z.ZodOptional<z.ZodString>;
    saleLabel: z.ZodOptional<z.ZodString>;
    actionModals: z.ZodOptional<z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        heading: z.ZodString;
        description: z.ZodString;
        reasonsLabel: z.ZodString;
        reasons: z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            label: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            value: string;
        }, {
            label: string;
            value: string;
        }>, "many">;
        keepLabel: z.ZodString;
        confirmLabel: z.ZodString;
        confirmIcon: z.ZodOptional<z.ZodString>;
        other: z.ZodOptional<z.ZodObject<{
            label: z.ZodString;
            placeholder: z.ZodString;
            maxLength: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            label: string;
            placeholder: string;
            maxLength: number;
        }, {
            label: string;
            placeholder: string;
            maxLength: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        heading: string;
        description: string;
        reasonsLabel: string;
        reasons: {
            label: string;
            value: string;
        }[];
        keepLabel: string;
        confirmLabel: string;
        other?: {
            label: string;
            placeholder: string;
            maxLength: number;
        } | undefined;
        confirmIcon?: string | undefined;
    }, {
        slug: string;
        heading: string;
        description: string;
        reasonsLabel: string;
        reasons: {
            label: string;
            value: string;
        }[];
        keepLabel: string;
        confirmLabel: string;
        other?: {
            label: string;
            placeholder: string;
            maxLength: number;
        } | undefined;
        confirmIcon?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    description: string;
    name: string;
    price: number;
    currency: string;
    interval: "month" | "year";
    features: string[];
    details: {
        sla?: {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        } | undefined;
        scope?: string[] | undefined;
        terms?: string[] | undefined;
        quotas?: {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }[] | undefined;
        benefits?: {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        } | undefined;
        excludes?: string[] | undefined;
    };
    highlight: boolean;
    visibility: "hosted" | "self-hosted";
    salePrice?: number | undefined;
    saleEndsAt?: string | undefined;
    saleLabel?: string | undefined;
    actionModals?: {
        slug: string;
        heading: string;
        description: string;
        reasonsLabel: string;
        reasons: {
            label: string;
            value: string;
        }[];
        keepLabel: string;
        confirmLabel: string;
        other?: {
            label: string;
            placeholder: string;
            maxLength: number;
        } | undefined;
        confirmIcon?: string | undefined;
    }[] | undefined;
}, {
    slug: string;
    description: string;
    name: string;
    price: number;
    currency: string;
    interval: "month" | "year";
    features: string[];
    details: {
        sla?: {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        } | undefined;
        scope?: string[] | undefined;
        terms?: string[] | undefined;
        quotas?: {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }[] | undefined;
        benefits?: {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        } | undefined;
        excludes?: string[] | undefined;
    };
    highlight: boolean;
    visibility: "hosted" | "self-hosted";
    salePrice?: number | undefined;
    saleEndsAt?: string | undefined;
    saleLabel?: string | undefined;
    actionModals?: {
        slug: string;
        heading: string;
        description: string;
        reasonsLabel: string;
        reasons: {
            label: string;
            value: string;
        }[];
        keepLabel: string;
        confirmLabel: string;
        other?: {
            label: string;
            placeholder: string;
            maxLength: number;
        } | undefined;
        confirmIcon?: string | undefined;
    }[] | undefined;
}>;
export declare const HydratedPlanSchema: z.ZodEffects<z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    currency: z.ZodString;
    interval: z.ZodEnum<["month", "year"]>;
    features: z.ZodArray<z.ZodString, "many">;
    details: z.ZodObject<{
        sla: z.ZodOptional<z.ZodObject<{
            availability: z.ZodOptional<z.ZodString>;
            responseTime: z.ZodOptional<z.ZodString>;
            sessionBooking: z.ZodOptional<z.ZodString>;
            sessionDuration: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        }, {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        }>>;
        scope: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        terms: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        quotas: z.ZodOptional<z.ZodArray<z.ZodObject<{
            icon: z.ZodString;
            slug: z.ZodString;
            label: z.ZodString;
            limit: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }, {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }>, "many">>;
        benefits: z.ZodOptional<z.ZodObject<{
            activeHeader: z.ZodOptional<z.ZodString>;
            activeItems: z.ZodArray<z.ZodString, "many">;
            inactiveHeader: z.ZodOptional<z.ZodString>;
            inactiveItems: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        }, {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        }>>;
        excludes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        sla?: {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        } | undefined;
        scope?: string[] | undefined;
        terms?: string[] | undefined;
        quotas?: {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }[] | undefined;
        benefits?: {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        } | undefined;
        excludes?: string[] | undefined;
    }, {
        sla?: {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        } | undefined;
        scope?: string[] | undefined;
        terms?: string[] | undefined;
        quotas?: {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }[] | undefined;
        benefits?: {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        } | undefined;
        excludes?: string[] | undefined;
    }>;
    highlight: z.ZodBoolean;
    visibility: z.ZodEnum<["self-hosted", "hosted"]>;
    salePrice: z.ZodOptional<z.ZodNumber>;
    saleEndsAt: z.ZodOptional<z.ZodString>;
    saleLabel: z.ZodOptional<z.ZodString>;
    actionModals: z.ZodOptional<z.ZodArray<z.ZodObject<{
        slug: z.ZodString;
        heading: z.ZodString;
        description: z.ZodString;
        reasonsLabel: z.ZodString;
        reasons: z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            label: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            value: string;
        }, {
            label: string;
            value: string;
        }>, "many">;
        keepLabel: z.ZodString;
        confirmLabel: z.ZodString;
        confirmIcon: z.ZodOptional<z.ZodString>;
        other: z.ZodOptional<z.ZodObject<{
            label: z.ZodString;
            placeholder: z.ZodString;
            maxLength: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            label: string;
            placeholder: string;
            maxLength: number;
        }, {
            label: string;
            placeholder: string;
            maxLength: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        heading: string;
        description: string;
        reasonsLabel: string;
        reasons: {
            label: string;
            value: string;
        }[];
        keepLabel: string;
        confirmLabel: string;
        other?: {
            label: string;
            placeholder: string;
            maxLength: number;
        } | undefined;
        confirmIcon?: string | undefined;
    }, {
        slug: string;
        heading: string;
        description: string;
        reasonsLabel: string;
        reasons: {
            label: string;
            value: string;
        }[];
        keepLabel: string;
        confirmLabel: string;
        other?: {
            label: string;
            placeholder: string;
            maxLength: number;
        } | undefined;
        confirmIcon?: string | undefined;
    }>, "many">>;
} & {
    state: z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
        status: z.ZodLiteral<"NONE">;
        actions: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            label: z.ZodString;
            url: z.ZodOptional<z.ZodString>;
            endpoint: z.ZodOptional<z.ZodString>;
            iconBefore: z.ZodOptional<z.ZodString>;
            iconAfter: z.ZodOptional<z.ZodString>;
            variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
            modalSlug: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodBoolean>;
            disabledReason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: "NONE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
    }, {
        status: "NONE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
    }>, z.ZodObject<{
        status: z.ZodLiteral<"ACTIVE">;
        badge: z.ZodString;
        badgeIcon: z.ZodOptional<z.ZodString>;
        statusInfo: z.ZodOptional<z.ZodObject<{
            descIcon: z.ZodOptional<z.ZodString>;
            descText: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            descIcon?: string | undefined;
            descText?: string | undefined;
        }, {
            descIcon?: string | undefined;
            descText?: string | undefined;
        }>>;
        pools: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            label: z.ZodString;
            limit: z.ZodNumber;
            used: z.ZodNumber;
            purchased: z.ZodOptional<z.ZodNumber>;
            cta: z.ZodOptional<z.ZodObject<{
                slug: z.ZodString;
                label: z.ZodString;
                url: z.ZodOptional<z.ZodString>;
                endpoint: z.ZodOptional<z.ZodString>;
                iconBefore: z.ZodOptional<z.ZodString>;
                iconAfter: z.ZodOptional<z.ZodString>;
                variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
                modalSlug: z.ZodOptional<z.ZodString>;
                disabled: z.ZodOptional<z.ZodBoolean>;
                disabledReason: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                slug: string;
                label: string;
                url?: string | undefined;
                variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
                endpoint?: string | undefined;
                iconBefore?: string | undefined;
                iconAfter?: string | undefined;
                modalSlug?: string | undefined;
                disabled?: boolean | undefined;
                disabledReason?: string | undefined;
            }, {
                slug: string;
                label: string;
                url?: string | undefined;
                variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
                endpoint?: string | undefined;
                iconBefore?: string | undefined;
                iconAfter?: string | undefined;
                modalSlug?: string | undefined;
                disabled?: boolean | undefined;
                disabledReason?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            limit: number;
            used: number;
            purchased?: number | undefined;
            cta?: {
                slug: string;
                label: string;
                url?: string | undefined;
                variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
                endpoint?: string | undefined;
                iconBefore?: string | undefined;
                iconAfter?: string | undefined;
                modalSlug?: string | undefined;
                disabled?: boolean | undefined;
                disabledReason?: string | undefined;
            } | undefined;
        }, {
            slug: string;
            label: string;
            limit: number;
            used: number;
            purchased?: number | undefined;
            cta?: {
                slug: string;
                label: string;
                url?: string | undefined;
                variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
                endpoint?: string | undefined;
                iconBefore?: string | undefined;
                iconAfter?: string | undefined;
                modalSlug?: string | undefined;
                disabled?: boolean | undefined;
                disabledReason?: string | undefined;
            } | undefined;
        }>, "many">;
        actions: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            label: z.ZodString;
            url: z.ZodOptional<z.ZodString>;
            endpoint: z.ZodOptional<z.ZodString>;
            iconBefore: z.ZodOptional<z.ZodString>;
            iconAfter: z.ZodOptional<z.ZodString>;
            variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
            modalSlug: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodBoolean>;
            disabledReason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        badge: string;
        pools: {
            slug: string;
            label: string;
            limit: number;
            used: number;
            purchased?: number | undefined;
            cta?: {
                slug: string;
                label: string;
                url?: string | undefined;
                variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
                endpoint?: string | undefined;
                iconBefore?: string | undefined;
                iconAfter?: string | undefined;
                modalSlug?: string | undefined;
                disabled?: boolean | undefined;
                disabledReason?: string | undefined;
            } | undefined;
        }[];
        status: "ACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    }, {
        badge: string;
        pools: {
            slug: string;
            label: string;
            limit: number;
            used: number;
            purchased?: number | undefined;
            cta?: {
                slug: string;
                label: string;
                url?: string | undefined;
                variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
                endpoint?: string | undefined;
                iconBefore?: string | undefined;
                iconAfter?: string | undefined;
                modalSlug?: string | undefined;
                disabled?: boolean | undefined;
                disabledReason?: string | undefined;
            } | undefined;
        }[];
        status: "ACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    }>, z.ZodObject<{
        status: z.ZodLiteral<"TRIAL">;
        badge: z.ZodString;
        badgeIcon: z.ZodOptional<z.ZodString>;
        progress: z.ZodObject<{
            icon: z.ZodString;
            label: z.ZodString;
            value: z.ZodNumber;
            total: z.ZodNumber;
            countLabel: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        }, {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        }>;
        deprovisionAt: z.ZodOptional<z.ZodString>;
        statusInfo: z.ZodOptional<z.ZodObject<{
            descIcon: z.ZodOptional<z.ZodString>;
            descText: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            descIcon?: string | undefined;
            descText?: string | undefined;
        }, {
            descIcon?: string | undefined;
            descText?: string | undefined;
        }>>;
        actions: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            label: z.ZodString;
            url: z.ZodOptional<z.ZodString>;
            endpoint: z.ZodOptional<z.ZodString>;
            iconBefore: z.ZodOptional<z.ZodString>;
            iconAfter: z.ZodOptional<z.ZodString>;
            variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
            modalSlug: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodBoolean>;
            disabledReason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "TRIAL";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    }, {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "TRIAL";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    }>, z.ZodObject<{
        status: z.ZodLiteral<"EXPIRED">;
        badge: z.ZodString;
        badgeIcon: z.ZodOptional<z.ZodString>;
        progress: z.ZodObject<{
            icon: z.ZodString;
            label: z.ZodString;
            value: z.ZodNumber;
            total: z.ZodNumber;
            countLabel: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        }, {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        }>;
        deprovisionAt: z.ZodOptional<z.ZodString>;
        statusInfo: z.ZodOptional<z.ZodObject<{
            descIcon: z.ZodOptional<z.ZodString>;
            descText: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            descIcon?: string | undefined;
            descText?: string | undefined;
        }, {
            descIcon?: string | undefined;
            descText?: string | undefined;
        }>>;
        actions: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            label: z.ZodString;
            url: z.ZodOptional<z.ZodString>;
            endpoint: z.ZodOptional<z.ZodString>;
            iconBefore: z.ZodOptional<z.ZodString>;
            iconAfter: z.ZodOptional<z.ZodString>;
            variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
            modalSlug: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodBoolean>;
            disabledReason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "EXPIRED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    }, {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "EXPIRED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    }>, z.ZodObject<{
        status: z.ZodLiteral<"CANCELLED">;
        badge: z.ZodString;
        daysRemaining: z.ZodNumber;
        daysLimit: z.ZodNumber;
        deprovisionAt: z.ZodString;
        statusInfo: z.ZodOptional<z.ZodObject<{
            descIcon: z.ZodOptional<z.ZodString>;
            descText: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            descIcon?: string | undefined;
            descText?: string | undefined;
        }, {
            descIcon?: string | undefined;
            descText?: string | undefined;
        }>>;
        actions: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            label: z.ZodString;
            url: z.ZodOptional<z.ZodString>;
            endpoint: z.ZodOptional<z.ZodString>;
            iconBefore: z.ZodOptional<z.ZodString>;
            iconAfter: z.ZodOptional<z.ZodString>;
            variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
            modalSlug: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodBoolean>;
            disabledReason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        badge: string;
        deprovisionAt: string;
        status: "CANCELLED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        daysRemaining: number;
        daysLimit: number;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    }, {
        badge: string;
        deprovisionAt: string;
        status: "CANCELLED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        daysRemaining: number;
        daysLimit: number;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    }>, z.ZodObject<{
        status: z.ZodLiteral<"INACTIVE">;
        badge: z.ZodString;
        badgeIcon: z.ZodOptional<z.ZodString>;
        deactivatedAt: z.ZodString;
        statusInfo: z.ZodOptional<z.ZodObject<{
            descIcon: z.ZodOptional<z.ZodString>;
            descText: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            descIcon?: string | undefined;
            descText?: string | undefined;
        }, {
            descIcon?: string | undefined;
            descText?: string | undefined;
        }>>;
        actions: z.ZodArray<z.ZodObject<{
            slug: z.ZodString;
            label: z.ZodString;
            url: z.ZodOptional<z.ZodString>;
            endpoint: z.ZodOptional<z.ZodString>;
            iconBefore: z.ZodOptional<z.ZodString>;
            iconAfter: z.ZodOptional<z.ZodString>;
            variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "ghost", "destructive"]>>;
            modalSlug: z.ZodOptional<z.ZodString>;
            disabled: z.ZodOptional<z.ZodBoolean>;
            disabledReason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }, {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        badge: string;
        deactivatedAt: string;
        status: "INACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    }, {
        badge: string;
        deactivatedAt: string;
        status: "INACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    description: string;
    name: string;
    price: number;
    currency: string;
    interval: "month" | "year";
    features: string[];
    details: {
        sla?: {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        } | undefined;
        scope?: string[] | undefined;
        terms?: string[] | undefined;
        quotas?: {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }[] | undefined;
        benefits?: {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        } | undefined;
        excludes?: string[] | undefined;
    };
    highlight: boolean;
    visibility: "hosted" | "self-hosted";
    state: {
        status: "NONE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
    } | {
        badge: string;
        pools: {
            slug: string;
            label: string;
            limit: number;
            used: number;
            purchased?: number | undefined;
            cta?: {
                slug: string;
                label: string;
                url?: string | undefined;
                variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
                endpoint?: string | undefined;
                iconBefore?: string | undefined;
                iconAfter?: string | undefined;
                modalSlug?: string | undefined;
                disabled?: boolean | undefined;
                disabledReason?: string | undefined;
            } | undefined;
        }[];
        status: "ACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "TRIAL";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "EXPIRED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        deprovisionAt: string;
        status: "CANCELLED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        daysRemaining: number;
        daysLimit: number;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        deactivatedAt: string;
        status: "INACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    };
    salePrice?: number | undefined;
    saleEndsAt?: string | undefined;
    saleLabel?: string | undefined;
    actionModals?: {
        slug: string;
        heading: string;
        description: string;
        reasonsLabel: string;
        reasons: {
            label: string;
            value: string;
        }[];
        keepLabel: string;
        confirmLabel: string;
        other?: {
            label: string;
            placeholder: string;
            maxLength: number;
        } | undefined;
        confirmIcon?: string | undefined;
    }[] | undefined;
}, {
    slug: string;
    description: string;
    name: string;
    price: number;
    currency: string;
    interval: "month" | "year";
    features: string[];
    details: {
        sla?: {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        } | undefined;
        scope?: string[] | undefined;
        terms?: string[] | undefined;
        quotas?: {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }[] | undefined;
        benefits?: {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        } | undefined;
        excludes?: string[] | undefined;
    };
    highlight: boolean;
    visibility: "hosted" | "self-hosted";
    state: {
        status: "NONE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
    } | {
        badge: string;
        pools: {
            slug: string;
            label: string;
            limit: number;
            used: number;
            purchased?: number | undefined;
            cta?: {
                slug: string;
                label: string;
                url?: string | undefined;
                variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
                endpoint?: string | undefined;
                iconBefore?: string | undefined;
                iconAfter?: string | undefined;
                modalSlug?: string | undefined;
                disabled?: boolean | undefined;
                disabledReason?: string | undefined;
            } | undefined;
        }[];
        status: "ACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "TRIAL";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "EXPIRED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        deprovisionAt: string;
        status: "CANCELLED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        daysRemaining: number;
        daysLimit: number;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        deactivatedAt: string;
        status: "INACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    };
    salePrice?: number | undefined;
    saleEndsAt?: string | undefined;
    saleLabel?: string | undefined;
    actionModals?: {
        slug: string;
        heading: string;
        description: string;
        reasonsLabel: string;
        reasons: {
            label: string;
            value: string;
        }[];
        keepLabel: string;
        confirmLabel: string;
        other?: {
            label: string;
            placeholder: string;
            maxLength: number;
        } | undefined;
        confirmIcon?: string | undefined;
    }[] | undefined;
}>, {
    slug: string;
    description: string;
    name: string;
    price: number;
    currency: string;
    interval: "month" | "year";
    features: string[];
    details: {
        sla?: {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        } | undefined;
        scope?: string[] | undefined;
        terms?: string[] | undefined;
        quotas?: {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }[] | undefined;
        benefits?: {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        } | undefined;
        excludes?: string[] | undefined;
    };
    highlight: boolean;
    visibility: "hosted" | "self-hosted";
    state: {
        status: "NONE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
    } | {
        badge: string;
        pools: {
            slug: string;
            label: string;
            limit: number;
            used: number;
            purchased?: number | undefined;
            cta?: {
                slug: string;
                label: string;
                url?: string | undefined;
                variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
                endpoint?: string | undefined;
                iconBefore?: string | undefined;
                iconAfter?: string | undefined;
                modalSlug?: string | undefined;
                disabled?: boolean | undefined;
                disabledReason?: string | undefined;
            } | undefined;
        }[];
        status: "ACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "TRIAL";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "EXPIRED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        deprovisionAt: string;
        status: "CANCELLED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        daysRemaining: number;
        daysLimit: number;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        deactivatedAt: string;
        status: "INACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    };
    salePrice?: number | undefined;
    saleEndsAt?: string | undefined;
    saleLabel?: string | undefined;
    actionModals?: {
        slug: string;
        heading: string;
        description: string;
        reasonsLabel: string;
        reasons: {
            label: string;
            value: string;
        }[];
        keepLabel: string;
        confirmLabel: string;
        other?: {
            label: string;
            placeholder: string;
            maxLength: number;
        } | undefined;
        confirmIcon?: string | undefined;
    }[] | undefined;
}, {
    slug: string;
    description: string;
    name: string;
    price: number;
    currency: string;
    interval: "month" | "year";
    features: string[];
    details: {
        sla?: {
            responseTime?: string | undefined;
            availability?: string | undefined;
            sessionBooking?: string | undefined;
            sessionDuration?: string | undefined;
        } | undefined;
        scope?: string[] | undefined;
        terms?: string[] | undefined;
        quotas?: {
            slug: string;
            label: string;
            limit: number;
            icon: string;
        }[] | undefined;
        benefits?: {
            activeItems: string[];
            inactiveHeader?: string | undefined;
            activeHeader?: string | undefined;
            inactiveItems?: string[] | undefined;
        } | undefined;
        excludes?: string[] | undefined;
    };
    highlight: boolean;
    visibility: "hosted" | "self-hosted";
    state: {
        status: "NONE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
    } | {
        badge: string;
        pools: {
            slug: string;
            label: string;
            limit: number;
            used: number;
            purchased?: number | undefined;
            cta?: {
                slug: string;
                label: string;
                url?: string | undefined;
                variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
                endpoint?: string | undefined;
                iconBefore?: string | undefined;
                iconAfter?: string | undefined;
                modalSlug?: string | undefined;
                disabled?: boolean | undefined;
                disabledReason?: string | undefined;
            } | undefined;
        }[];
        status: "ACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "TRIAL";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        progress: {
            label: string;
            value: number;
            icon: string;
            total: number;
            countLabel: string;
        };
        status: "EXPIRED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        deprovisionAt?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        deprovisionAt: string;
        status: "CANCELLED";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        daysRemaining: number;
        daysLimit: number;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    } | {
        badge: string;
        deactivatedAt: string;
        status: "INACTIVE";
        actions: {
            slug: string;
            label: string;
            url?: string | undefined;
            variant?: "primary" | "secondary" | "ghost" | "destructive" | undefined;
            endpoint?: string | undefined;
            iconBefore?: string | undefined;
            iconAfter?: string | undefined;
            modalSlug?: string | undefined;
            disabled?: boolean | undefined;
            disabledReason?: string | undefined;
        }[];
        badgeIcon?: string | undefined;
        statusInfo?: {
            descIcon?: string | undefined;
            descText?: string | undefined;
        } | undefined;
    };
    salePrice?: number | undefined;
    saleEndsAt?: string | undefined;
    saleLabel?: string | undefined;
    actionModals?: {
        slug: string;
        heading: string;
        description: string;
        reasonsLabel: string;
        reasons: {
            label: string;
            value: string;
        }[];
        keepLabel: string;
        confirmLabel: string;
        other?: {
            label: string;
            placeholder: string;
            maxLength: number;
        } | undefined;
        confirmIcon?: string | undefined;
    }[] | undefined;
}>;
//# sourceMappingURL=validation.d.ts.map