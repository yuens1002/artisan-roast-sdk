"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALACARTE_SCENARIO_KEYS = exports.ALACARTE_SCENARIOS = void 0;
exports.ALACARTE_SCENARIOS = {
    TICKETS_5: {
        id: "alacarte-tickets-5",
        label: "5 Support Tickets",
        description: "Add 5 priority support tickets to your account. Never expire.",
        price: "$39",
        checkoutUrl: "/api/checkout",
        pools: [{ slug: "ticket", label: "Priority Tickets", quantity: 5 }],
    },
    SESSIONS_2: {
        id: "alacarte-sessions-2",
        label: "2 1:1 Sessions (30 min)",
        description: "Add 2 scheduled 1:1 sessions. Never expire.",
        price: "$99",
        checkoutUrl: "/api/checkout",
        pools: [{ slug: "one_on_one", label: "1:1 Sessions", quantity: 2 }],
    },
};
exports.ALACARTE_SCENARIO_KEYS = Object.keys(exports.ALACARTE_SCENARIOS);
//# sourceMappingURL=scaffolds.js.map