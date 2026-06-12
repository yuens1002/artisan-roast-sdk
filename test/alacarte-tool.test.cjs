"use strict";

// Tests for validate_addon_payload runtime behavior — run against compiled output.
const test = require("node:test");
const assert = require("node:assert/strict");
const { InMemoryTransport } = require("@modelcontextprotocol/sdk/inMemory.js");
const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { createMcpServer } = require("../dist/mcp/server.js");
const { ALACARTE_SCENARIOS } = require("../dist/alacarte/scaffolds.js");

async function callTool(client, name, args) {
  return client.callTool({ name, arguments: args });
}

async function withClient(fn) {
  const server = createMcpServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "test-client", version: "0.0.0" });
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  try {
    await fn(client);
  } finally {
    await client.close();
    await server.close();
  }
}

test("validate_addon_payload — invalid JSON returns { valid: false }", async () => {
  await withClient(async (client) => {
    const res = await callTool(client, "validate_addon_payload", { payload: "not json {{{" });
    const body = JSON.parse(res.content[0].text);
    assert.equal(body.valid, false);
    assert.ok(body.errors[0].message.includes("Invalid JSON"));
  });
});

test("validate_addon_payload — valid AddOnsResponse returns { valid: true }", async () => {
  await withClient(async (client) => {
    const payload = JSON.stringify({
      packages: [ALACARTE_SCENARIOS.TICKETS_5, ALACARTE_SCENARIOS.SESSIONS_2],
    });
    const res = await callTool(client, "validate_addon_payload", { payload });
    const body = JSON.parse(res.content[0].text);
    assert.equal(body.valid, true);
  });
});

test("validate_addon_payload — valid AlaCartePackage returns { valid: true }", async () => {
  await withClient(async (client) => {
    const payload = JSON.stringify(ALACARTE_SCENARIOS.TICKETS_5);
    const res = await callTool(client, "validate_addon_payload", { payload });
    const body = JSON.parse(res.content[0].text);
    assert.equal(body.valid, true);
  });
});

test("validate_addon_payload — valid CheckoutResponse returns { valid: true }", async () => {
  await withClient(async (client) => {
    const payload = JSON.stringify({ url: "https://checkout.stripe.com/pay/cs_test_abc123" });
    const res = await callTool(client, "validate_addon_payload", { payload });
    const body = JSON.parse(res.content[0].text);
    assert.equal(body.valid, true);
  });
});

test("validate_addon_payload — structurally wrong object returns { valid: false } with errors", async () => {
  await withClient(async (client) => {
    const payload = JSON.stringify({ completely: "wrong", shape: true });
    const res = await callTool(client, "validate_addon_payload", { payload });
    const body = JSON.parse(res.content[0].text);
    assert.equal(body.valid, false);
    assert.ok(Array.isArray(body.errors) && body.errors.length > 0);
  });
});
