import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  AddOnsResponseSchema,
  AlaCartePackageSchema,
  CheckoutResponseSchema,
} from "../../alacarte/index.js";
import { ALACARTE_SCENARIOS, ALACARTE_SCENARIO_KEYS } from "../../alacarte/scaffolds.js";

export function registerAlaCarteTools(server: McpServer): void {
  server.registerTool(
    "validate_addon_payload",
    {
      description:
        "Validates an à la carte payload against the artisan-roast-sdk schema. " +
        "Accepts AddOnsResponse ({ packages: AlaCartePackage[] }), " +
        "a single AlaCartePackage ({ id, label, description, price, checkoutUrl, pools }), " +
        "or a CheckoutResponse ({ url }). " +
        "Returns { valid: true } on success or structured zod errors on failure.",
      inputSchema: {
        payload: z
          .string()
          .describe("JSON string of the AddOnsResponse, AlaCartePackage, or CheckoutResponse payload to validate"),
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

      if (parsed !== null && typeof parsed === "object") {
        // AddOnsResponse has `packages`
        if ("packages" in parsed) {
          const result = AddOnsResponseSchema.safeParse(parsed);
          if (result.success) {
            return { content: [{ type: "text", text: JSON.stringify({ valid: true }) }] };
          }
          return {
            content: [{ type: "text", text: JSON.stringify({ valid: false, errors: result.error.issues }) }],
          };
        }

        // AlaCartePackage has `id` + `pools`
        if ("id" in parsed && "pools" in parsed) {
          const result = AlaCartePackageSchema.safeParse(parsed);
          if (result.success) {
            return { content: [{ type: "text", text: JSON.stringify({ valid: true }) }] };
          }
          return {
            content: [{ type: "text", text: JSON.stringify({ valid: false, errors: result.error.issues }) }],
          };
        }

        // CheckoutResponse has `url`
        if ("url" in parsed) {
          const result = CheckoutResponseSchema.safeParse(parsed);
          if (result.success) {
            return { content: [{ type: "text", text: JSON.stringify({ valid: true }) }] };
          }
          return {
            content: [{ type: "text", text: JSON.stringify({ valid: false, errors: result.error.issues }) }],
          };
        }
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              valid: false,
              errors: [{ message: "Payload does not match AddOnsResponse, AlaCartePackage, or CheckoutResponse shape" }],
            }),
          },
        ],
      };
    }
  );

  server.registerTool(
    "scaffold_alacarte_package",
    {
      description:
        "Returns a valid AlaCartePackage JSON for a named scenario. " +
        "Useful for testing add-ons page rendering and verifying consumer implementations. " +
        `Valid scenarios: ${ALACARTE_SCENARIO_KEYS.join(", ")}.`,
      inputSchema: {
        scenario: z
          .string()
          .describe(`Scenario name. One of: ${ALACARTE_SCENARIO_KEYS.join(", ")}`),
      },
    },
    async ({ scenario }) => {
      if (!(scenario in ALACARTE_SCENARIOS)) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: `Unknown scenario: "${scenario}". Valid scenarios: ${ALACARTE_SCENARIO_KEYS.join(", ")}`,
              }),
            },
          ],
        };
      }

      const pkg = ALACARTE_SCENARIOS[scenario as keyof typeof ALACARTE_SCENARIOS];
      return {
        content: [{ type: "text", text: JSON.stringify(pkg, null, 2) }],
      };
    }
  );
}
