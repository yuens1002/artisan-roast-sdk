import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HydratedPlanSchema, PlanSchema } from "../../plans/validation.js";
import { SCENARIOS, SCENARIO_KEYS } from "../../plans/scaffolds.js";

export function registerPlanTools(server: McpServer): void {
  server.registerTool(
    "validate_plan_payload",
    {
      description:
        "Validates a Plan or HydratedPlan JSON payload against the artisan-roast-sdk schema. " +
        "Returns { valid: true } on success or structured zod errors on failure. " +
        "All PlanState.status values must be UPPERCASE (NONE, ACTIVE, TRIAL, EXPIRED, CANCELLED, INACTIVE).",
      inputSchema: {
        payload: z
          .string()
          .describe("JSON string of the Plan or HydratedPlan payload to validate"),
      },
    },
    async ({ payload }) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(payload);
      } catch {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ valid: false, errors: [{ message: "Invalid JSON" }] }),
            },
          ],
        };
      }

      // Try HydratedPlan first (has `state`), then plain Plan
      if (parsed !== null && typeof parsed === "object" && "state" in parsed) {
        const result = HydratedPlanSchema.safeParse(parsed);
        if (result.success) {
          return { content: [{ type: "text", text: JSON.stringify({ valid: true }) }] };
        }
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ valid: false, errors: result.error.issues }),
            },
          ],
        };
      }

      const result = PlanSchema.safeParse(parsed);
      if (result.success) {
        return { content: [{ type: "text", text: JSON.stringify({ valid: true }) }] };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ valid: false, errors: result.error.issues }),
          },
        ],
      };
    }
  );

  server.registerTool(
    "scaffold_plan_state",
    {
      description:
        "Returns a valid HydratedPlan JSON for a named scenario. " +
        "Useful for testing plan-card rendering and verifying consumer implementations. " +
        `Valid scenarios: ${SCENARIO_KEYS.join(", ")}.`,
      inputSchema: {
        scenario: z
          .string()
          .describe(`Scenario name. One of: ${SCENARIO_KEYS.join(", ")}`),
      },
    },
    async ({ scenario }) => {
      if (!(scenario in SCENARIOS)) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: `Unknown scenario: "${scenario}". Valid scenarios: ${SCENARIO_KEYS.join(", ")}`,
              }),
            },
          ],
        };
      }

      const plan = SCENARIOS[scenario]!;
      return {
        content: [{ type: "text", text: JSON.stringify(plan, null, 2) }],
      };
    }
  );

  server.registerTool(
    "scaffold_resolved_endpoint",
    {
      description:
        "Returns a TypeScript scaffold for implementing GET /api/plans/resolved. " +
        "The endpoint should return ResolvedPlansResponse { plans: HydratedPlan[], resolvedAt: string }.",
    },
    async () => {
      const scaffold = `import type { HydratedPlan, ResolvedPlansResponse } from "artisan-roast-sdk";

// GET /api/plans/resolved
// Authenticated: Bearer <license-key>
// Revalidation: ~60 seconds (store polls this endpoint)
export async function GET(req: Request): Promise<Response> {
  const authHeader = req.headers.get("Authorization");
  const licenseKey = authHeader?.replace("Bearer ", "");

  if (!licenseKey) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: look up the hosted instance by license key
  // const instance = await db.hostedInstance.findUnique({ where: { licenseKey } });
  // if (!instance) return Response.json({ error: "Not found" }, { status: 404 });

  // TODO: resolve plan state for this instance
  const plans: HydratedPlan[] = [
    // {
    //   ...HOUSE_BLEND_PLAN,
    //   state: resolveState(instance),
    // }
  ];

  const response: ResolvedPlansResponse = {
    plans,
    resolvedAt: new Date().toISOString(),
  };

  return Response.json(response);
}
`;
      return { content: [{ type: "text", text: scaffold }] };
    }
  );
}
