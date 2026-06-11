"use strict";

// Tests run against the compiled output — run `npm run build` first.
const test = require("node:test");
const assert = require("node:assert/strict");
const { InMemoryTransport } = require("@modelcontextprotocol/sdk/inMemory.js");
const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { SDK_VERSION, createMcpServer } = require("../dist/mcp/server.js");
const pkg = require("../package.json");

test("SDK_VERSION is read from package.json", () => {
  assert.equal(SDK_VERSION, pkg.version);
});

test("the MCP server reports package.json version as serverInfo.version", async () => {
  const server = createMcpServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "test-client", version: "0.0.0" });

  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  try {
    const serverInfo = client.getServerVersion();
    assert.equal(serverInfo?.name, "artisan-roast-sdk");
    assert.equal(serverInfo?.version, pkg.version);
  } finally {
    await client.close();
    await server.close();
  }
});

test("the MCP server exposes validate_plan_payload and the scaffold tools", async () => {
  const server = createMcpServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "test-client", version: "0.0.0" });

  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  try {
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name).sort();
    assert.deepEqual(names, [
      "scaffold_alacarte_package",
      "scaffold_plan_state",
      "scaffold_resolved_endpoint",
      "validate_addon_payload",
      "validate_plan_payload",
    ]);
  } finally {
    await client.close();
    await server.close();
  }
});
