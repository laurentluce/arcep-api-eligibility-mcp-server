#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "arcep-api-eligibility",
  version: "1.0.0",
});

async function getEligibilities(): Promise<string> {
  return "Not implemented yet";
}

server.tool(
  "get_eligibilities",
  "Get eligibilities from the ARCEP API",
  {},
  async () => {
    const result = await getEligibilities();
    return {
      content: [{ type: "text", text: result }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
