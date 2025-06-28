import { tool } from "@langchain/core/tools"
import { z } from "zod"
import axios from "axios"
import { config } from "@/config"

export const searchTool = tool(
  async ({ query }: { query: string }) => {
    const response = await axios.get(`${config.GOOGLE_CSE_API_URI}&q=${query}`)
    const items = response.data.items || []
    if (items.length === 0) return "No search results found."
    const topResults = items.slice(0, 5).map((item: any, idx: number) => {
      return `${idx + 1}. ${item.title}\n${item.snippet}\n${item.link}`
    })

    return topResults.join("\n\n")
  },
  {
    name: "web_search",
    description:
      "Search the web using Google. Use this for up-to-date or factual information.",
    schema: z.object({
      query: z.string().describe("The search query to find information for."),
    }),
  }
)
