"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const plans_js_1 = require("./tools/plans.js");
const plans_js_2 = require("./resources/plans.js");
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3100;
function createMcpServer() {
    const server = new mcp_js_1.McpServer({
        name: "artisan-roast-sdk",
        version: "0.2.0",
    });
    (0, plans_js_1.registerPlanTools)(server);
    (0, plans_js_2.registerPlanResources)(server);
    return server;
}
const httpServer = node_http_1.default.createServer(async (req, res) => {
    if (req.url === "/health" || req.url === "/") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "ok", version: "0.2.0" }));
        return;
    }
    if (!req.url?.startsWith("/mcp")) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        return;
    }
    const transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
    });
    const mcpServer = createMcpServer();
    try {
        await mcpServer.connect(transport);
        await transport.handleRequest(req, res);
    }
    finally {
        await mcpServer.close();
    }
});
httpServer.listen(PORT, () => {
    console.log(`artisan-roast-sdk MCP server listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map