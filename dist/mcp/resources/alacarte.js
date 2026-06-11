"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAlaCarteResources = registerAlaCarteResources;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const ROOT = (0, node_path_1.join)(__dirname, "..", "..", "..");
function registerAlaCarteResources(server) {
    server.registerResource("alacarte-types", "alacarte://types", {
        description: "TypeScript source for AlaCartePool, AlaCartePackage, AddOnsResponse, CheckoutRequest, and CheckoutResponse types.",
        mimeType: "text/plain",
    }, async () => {
        const source = (0, node_fs_1.readFileSync)((0, node_path_1.join)(ROOT, "src", "alacarte", "index.ts"), "utf-8");
        return {
            contents: [{ uri: "alacarte://types", mimeType: "text/plain", text: source }],
        };
    });
}
//# sourceMappingURL=alacarte.js.map