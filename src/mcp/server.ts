import http from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerPlanTools } from "./tools/plans.js";
import { registerPlanResources } from "./resources/plans.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3100;

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "artisan-roast-sdk",
    version: "0.2.0",
  });
  registerPlanTools(server);
  registerPlanResources(server);
  return server;
}

const httpServer = http.createServer(async (req, res) => {
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

httpServer.listen(PORT, () => {
  console.log(`artisan-roast-sdk MCP server listening on port ${PORT}`);
});
