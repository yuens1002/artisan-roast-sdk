"use strict";

// Tests run against compiled output — run `npm run build` first.
const test = require("node:test");
const assert = require("node:assert/strict");
const {
  AlaCartePackageSchema,
  AddOnsResponseSchema,
  CheckoutResponseSchema,
} = require("../dist/alacarte/index.js");
const { ALACARTE_SCENARIOS, ALACARTE_SCENARIO_KEYS } = require("../dist/alacarte/scaffolds.js");

test("TICKETS_5 scaffold round-trips through AlaCartePackageSchema", () => {
  const result = AlaCartePackageSchema.safeParse(ALACARTE_SCENARIOS.TICKETS_5);
  assert.equal(result.success, true, result.success ? "" : JSON.stringify(result.error.issues));
});

test("SESSIONS_2 scaffold round-trips through AlaCartePackageSchema", () => {
  const result = AlaCartePackageSchema.safeParse(ALACARTE_SCENARIOS.SESSIONS_2);
  assert.equal(result.success, true, result.success ? "" : JSON.stringify(result.error.issues));
});

test("AddOnsResponseSchema accepts a payload wrapping both scaffolds", () => {
  const result = AddOnsResponseSchema.safeParse({
    packages: [ALACARTE_SCENARIOS.TICKETS_5, ALACARTE_SCENARIOS.SESSIONS_2],
  });
  assert.equal(result.success, true, result.success ? "" : JSON.stringify(result.error.issues));
});

test("ALACARTE_SCENARIO_KEYS has length 2 and contains both scenario keys", () => {
  assert.equal(ALACARTE_SCENARIO_KEYS.length, 2);
  assert.ok(ALACARTE_SCENARIO_KEYS.includes("TICKETS_5"));
  assert.ok(ALACARTE_SCENARIO_KEYS.includes("SESSIONS_2"));
});

test("CheckoutResponseSchema accepts { url: string }", () => {
  const result = CheckoutResponseSchema.safeParse({ url: "https://checkout.stripe.com/test_abc123" });
  assert.equal(result.success, true, result.success ? "" : JSON.stringify(result.error.issues));
});

test("CheckoutResponseSchema rejects missing url", () => {
  const result = CheckoutResponseSchema.safeParse({});
  assert.equal(result.success, false);
});
