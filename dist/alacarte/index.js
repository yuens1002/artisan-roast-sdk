"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutResponseSchema = exports.AddOnsResponseSchema = exports.AlaCartePackageSchema = exports.AlaCartePoolSchema = exports.ALACARTE_SCENARIO_KEYS = exports.ALACARTE_SCENARIOS = void 0;
const zod_1 = require("zod");
var scaffolds_js_1 = require("./scaffolds.js");
Object.defineProperty(exports, "ALACARTE_SCENARIOS", { enumerable: true, get: function () { return scaffolds_js_1.ALACARTE_SCENARIOS; } });
Object.defineProperty(exports, "ALACARTE_SCENARIO_KEYS", { enumerable: true, get: function () { return scaffolds_js_1.ALACARTE_SCENARIO_KEYS; } });
// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------
exports.AlaCartePoolSchema = zod_1.z.object({
    slug: zod_1.z.string(),
    label: zod_1.z.string(),
    quantity: zod_1.z.number(),
});
exports.AlaCartePackageSchema = zod_1.z.object({
    id: zod_1.z.string(),
    label: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.string(),
    checkoutUrl: zod_1.z.string(),
    pools: zod_1.z.array(exports.AlaCartePoolSchema),
});
exports.AddOnsResponseSchema = zod_1.z.object({
    packages: zod_1.z.array(exports.AlaCartePackageSchema),
});
exports.CheckoutResponseSchema = zod_1.z.object({
    url: zod_1.z.string(),
});
//# sourceMappingURL=index.js.map