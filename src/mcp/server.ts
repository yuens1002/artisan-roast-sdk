import http from "node:http";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerPlanTools } from "./tools/plans.js";
import { registerPlanResources } from "./resources/plans.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3100;

// Single source of truth for the SDK version: package.json, read module-relative
// at runtime (dist/mcp/server.js → ../../package.json). CJS/ESM-agnostic, no
// tsconfig change, no JSON-import assertion sensitivity.
export const SDK_VERSION: string = (
  JSON.parse(readFileSync(join(__dirname, "..", "..", "package.json"), "utf8")) as {
    version: string;
  }
).version;

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "artisan-roast-sdk",
    version: SDK_VERSION,
  });
  registerPlanTools(server);
  registerPlanResources(server);
  return server;
}

export function createHttpServer(): http.Server {
  return http.createServer(async (req, res) => {
    if (req.url === "/health" || req.url === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", version: SDK_VERSION }));
      return;
    }

    if (!req.url?.startsWith("/mcp")) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    const mcpServer = createMcpServer();

    try {
      await mcpServer.connect(transport);
      await transport.handleRequest(req, res);
    } finally {
      await mcpServer.close();
    }
  });
}

// Start the server only when run as the entry point — importing this module
// (e.g. from a test) must not bind a port.
if (require.main === module) {
  createHttpServer().listen(PORT, () => {
    console.log(`artisan-roast-sdk MCP server listening on port ${PORT}`);
  });
}
