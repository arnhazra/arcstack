// src/tools/weather.tool.ts
import { tool } from "@langchain/core/tools"
import { z } from "zod"
import axios from "axios"
import { config } from "@/config"

export const weatherTool = tool(
  async ({ location }: { location: string }) => {
    const response = await axios.get(`${config.WEATHER_API_URI}&q=${location}`)
    const data = response.data

    return `Weather in ${data.name}, ${data.sys.country}:
            - ${data.weather[0].main}: ${data.weather[0].description}
            - Temperature: ${data.main.temp}°C
            - Feels like: ${data.main.feels_like}°C
            - Humidity: ${data.main.humidity}%
            - Wind Speed: ${data.wind.speed} m/s`
  },
  {
    name: "get_weather",
    description: "Get current weather for a specific location.",
    schema: z.object({
      location: z.string().describe("City or location to get weather for."),
    }),
  }
)
