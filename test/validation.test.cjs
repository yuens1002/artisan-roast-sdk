"use strict";

// Tests run against the compiled output — run `npm run build` first.
const test = require("node:test");
const assert = require("node:assert/strict");
const {
  HydratedPlanSchema,
  PlanSchema,
  PlanStateSchema,
  ActionModalSchema,
} = require("../dist/plans/validation.js");
const { SCENARIOS, SCENARIO_KEYS } = require("../dist/plans/scaffolds.js");

const baseHouseBlend = {
  slug: "house-blend",
  name: "House Blend",
  description: "Fully managed hosting.",
  price: 7900,
  currency: "USD",
  interval: "month",
  features: ["hosting"],
  details: { benefits: { activeItems: ["Managed hosting & backups"] } },
  highlight: true,
  visibility: "hosted",
};

const pendingState = {
  status: "PENDING",
  statusInfo: { descIcon: "loader-2", descText: "Setting up your store — a few minutes." },
  actions: [
    { slug: "check-status", label: "Check Status", endpoint: "/api/plans/status", variant: "primary" },
  ],
};

const feedbackModal = {
  type: "feedbackForm",
  slug: "cancel-subscription",
  heading: "Cancel your subscription?",
  description: "We'd love to know why before you go.",
  reasonsLabel: "Reason for cancelling",
  reasons: [
    { value: "too-expensive", label: "Too expensive" },
    { value: "other", label: "Other" },
  ],
  keepLabel: "Keep subscription",
  confirmLabel: "Cancel Subscription",
};

const paymentModal = {
  type: "paymentConfirm",
  slug: "convert-payment",
  heading: "Completing your subscription",
  description: "You'll be charged $79.00/month.",
  confirmLabel: "Confirm and pay",
  processingMessages: ["Processing payment…", "Almost there…"],
};

test("HydratedPlanSchema accepts a PENDING payload", () => {
  const result = HydratedPlanSchema.safeParse({ ...baseHouseBlend, state: pendingState });
  assert.equal(result.success, true, result.success ? "" : JSON.stringify(result.error.issues));
});

test("PENDING state errors when pools are present", () => {
  const result = HydratedPlanSchema.safeParse({
    ...baseHouseBlend,
    state: { ...pendingState, pools: [{ slug: "x", label: "X", limit: 1, used: 0 }] },
  });
  assert.equal(result.success, false);
});

test("PlanStateSchema discriminates PENDING distinctly from NONE", () => {
  assert.equal(PlanStateSchema.safeParse(pendingState).success, true);
  // NONE has no statusInfo field, but is non-strict — the discriminator does the work.
  assert.equal(PlanStateSchema.safeParse({ status: "NONE", actions: [] }).success, true);
});

test("actionModals accepts a feedbackForm entry", () => {
  assert.equal(ActionModalSchema.safeParse(feedbackModal).success, true);
  const plan = PlanSchema.safeParse({ ...baseHouseBlend, actionModals: [feedbackModal] });
  assert.equal(plan.success, true, plan.success ? "" : JSON.stringify(plan.error.issues));
});

test("actionModals accepts a paymentConfirm entry", () => {
  assert.equal(ActionModalSchema.safeParse(paymentModal).success, true);
  const plan = PlanSchema.safeParse({ ...baseHouseBlend, actionModals: [paymentModal] });
  assert.equal(plan.success, true, plan.success ? "" : JSON.stringify(plan.error.issues));
});

test("actionModals accepts both modal types together", () => {
  const plan = HydratedPlanSchema.safeParse({
    ...baseHouseBlend,
    actionModals: [feedbackModal, paymentModal],
    state: pendingState,
  });
  assert.equal(plan.success, true, plan.success ? "" : JSON.stringify(plan.error.issues));
});

test("actionModals rejects an unknown modal type", () => {
  assert.equal(ActionModalSchema.safeParse({ ...feedbackModal, type: "mysteryModal" }).success, false);
  const plan = PlanSchema.safeParse({
    ...baseHouseBlend,
    actionModals: [{ ...feedbackModal, type: "mysteryModal" }],
  });
  assert.equal(plan.success, false);
});

test("paymentConfirm rejects an empty processingMessages array", () => {
  assert.equal(ActionModalSchema.safeParse({ ...paymentModal, processingMessages: [] }).success, false);
});

test("a modalSlug with no matching actionModals entry is rejected", () => {
  const result = HydratedPlanSchema.safeParse({
    ...baseHouseBlend,
    actionModals: [feedbackModal],
    state: {
      ...pendingState,
      actions: [
        { slug: "cancel", label: "Cancel", variant: "ghost", modalSlug: "does-not-exist" },
      ],
    },
  });
  assert.equal(result.success, false);
  // The error path points at the offending action, not a generic `state.actions`.
  const issue = result.success ? null : result.error.issues.find((i) => i.message.includes("does-not-exist"));
  assert.deepEqual(issue?.path, ["state", "actions", 0]);
});

test("a dangling modalSlug on a pool CTA reports the pool path, not state.actions", () => {
  const result = HydratedPlanSchema.safeParse({
    ...baseHouseBlend,
    actionModals: [feedbackModal],
    state: {
      status: "ACTIVE",
      badge: "Active",
      pools: [
        {
          slug: "tickets",
          label: "Priority Tickets",
          limit: 5,
          used: 0,
          icon: "ticket",
          countLabel: "used",
          cta: {
            slug: "submit-ticket",
            label: "Submit Ticket",
            variant: "ghost",
            modalSlug: "does-not-exist",
          },
        },
      ],
      actions: [],
    },
  });
  assert.equal(result.success, false);
  const issue = result.success ? null : result.error.issues.find((i) => i.message.includes("does-not-exist"));
  assert.deepEqual(issue?.path, ["state", "pools", 0, "cta"]);
});

test("a modalSlug that resolves to an actionModals entry is accepted", () => {
  const result = HydratedPlanSchema.safeParse({
    ...baseHouseBlend,
    actionModals: [feedbackModal],
    state: {
      status: "ACTIVE",
      badge: "Active",
      pools: [],
      actions: [
        { slug: "cancel", label: "Cancel Subscription", variant: "ghost", modalSlug: "cancel-subscription" },
      ],
    },
  });
  assert.equal(result.success, true, result.success ? "" : JSON.stringify(result.error.issues));
});

test("UsagePool without countLabel is accepted (countLabel is optional)", () => {
  const result = HydratedPlanSchema.safeParse({
    ...baseHouseBlend,
    state: {
      status: "ACTIVE",
      badge: "Active",
      pools: [{ slug: "tickets", label: "Priority Tickets", limit: 5, used: 0, icon: "ticket" }],
      actions: [],
    },
  });
  assert.equal(result.success, true, result.success ? "" : JSON.stringify(result.error.issues));
});

test("every scaffold scenario validates against HydratedPlanSchema", () => {
  for (const key of SCENARIO_KEYS) {
    const result = HydratedPlanSchema.safeParse(SCENARIOS[key]);
    assert.equal(result.success, true, `${key}: ${result.success ? "" : JSON.stringify(result.error.issues)}`);
  }
});

test("the PENDING scaffold is present and in PENDING state", () => {
  assert.ok(SCENARIO_KEYS.includes("PENDING"));
  assert.equal(SCENARIOS.PENDING.state.status, "PENDING");
});
