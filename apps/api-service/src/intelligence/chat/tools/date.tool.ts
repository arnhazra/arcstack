import { tool } from "@langchain/core/tools"
import { z } from "zod"

export const getTodayTool = tool(
  async () => new Date().toISOString().split("T")[0],
  {
    name: "get_today",
    description: "Returns today's date in ISO‐8601 format (YYYY-MM-DD).",
    schema: z.object({}),
  }
)
