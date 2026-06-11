export declare const ALACARTE_SCENARIOS: {
    readonly TICKETS_5: {
        readonly id: "alacarte-tickets-5";
        readonly label: "5 Support Tickets";
        readonly description: "Add 5 priority support tickets to your account. Never expire.";
        readonly price: "$39";
        readonly checkoutUrl: "/api/checkout";
        readonly pools: [{
            readonly slug: "ticket";
            readonly label: "Priority Tickets";
            readonly quantity: 5;
        }];
    };
    readonly SESSIONS_2: {
        readonly id: "alacarte-sessions-2";
        readonly label: "2 1:1 Sessions (30 min)";
        readonly description: "Add 2 scheduled 1:1 sessions. Never expire.";
        readonly price: "$99";
        readonly checkoutUrl: "/api/checkout";
        readonly pools: [{
            readonly slug: "one_on_one";
            readonly label: "1:1 Sessions";
            readonly quantity: 2;
        }];
    };
};
export declare const ALACARTE_SCENARIO_KEYS: (keyof typeof ALACARTE_SCENARIOS)[];
//# sourceMappingURL=scaffolds.d.ts.map