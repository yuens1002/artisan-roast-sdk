import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..", "..");

export function registerAlaCarteResources(server: McpServer): void {
  server.registerResource(
    "alacarte-types",
    "alacarte://types",
    {
      description:
        "TypeScript source for AlaCartePool, AlaCartePackage, AddOnsResponse, CheckoutRequest, and CheckoutResponse types.",
      mimeType: "text/plain",
    },
    async () => {
      const source = readFileSync(
        join(ROOT, "src", "alacarte", "index.ts"),
        "utf-8"
      );
      return {
        contents: [{ uri: "alacarte://types", mimeType: "text/plain", text: source }],
      };
    }
  );
}
