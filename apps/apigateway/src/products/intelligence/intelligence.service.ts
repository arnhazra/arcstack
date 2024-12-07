import { Injectable } from "@nestjs/common"
import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai"
import { envConfig } from "src/config"
import { CommandBus } from "@nestjs/cqrs"
import { CreateQueryCommand } from "./commands/impl/create-query.command"
import { Query } from "./schemas/query.schema"

@Injectable()
export class IntelligenceService {
  constructor(private readonly commandBus: CommandBus) {}

  async generateRecommendation(
    workspaceId: string,
    prompt: string,
    temperature: number,
    topP: number,
    topK: number
  ) {
    try {
      const genAI = new GoogleGenerativeAI(envConfig.geminiAPIKey)
      const generationConfig: GenerationConfig = {
        temperature: temperature ?? 0.9,
        topP: topP ?? 0.1,
        topK: topK ?? 16,
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig,
        systemInstruction: `You are a knowledgeable cricket analyst with extensive experience in the game, having followed cricket for over 15 years.
        You have a deep understanding of cricket rules, player statistics, match strategies, and historical performances.
        Your aim is to provide detailed insights and analyses about cricket, including but not limited to match previews,
        player comparisons, and strategic breakdowns. Your task is to provide comprehensive information about cricket based on
        the following details. Ensure that your analysis is clear, informative, and engaging, catering to both casual fans and more
        knowledgeable cricket enthusiasts.
        Note: You should not give any answers to user apart from any cricket question.`,
      })

      const result = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Who is Sachin ?" }],
          },
          {
            role: "model",
            parts: [{ text: "He is a cricketer" }],
          },
          {
            role: "user",
            parts: [{ text: "Who is he?" }],
          },
          {
            role: "model",
            parts: [{ text: "He is a legendary cricketer from India." }],
          },
          {
            role: "user",
            parts: [{ text: "When did he start playing cricket?" }],
          },
          {
            role: "model",
            parts: [{ text: "He started his international career in 1989." }],
          },
          {
            role: "user",
            parts: [{ text: "What was his debut match?" }],
          },
          {
            role: "model",
            parts: [{ text: "His debut match was against Pakistan." }],
          },
          {
            role: "user",
            parts: [{ text: "How old was he when he debuted?" }],
          },
          {
            role: "model",
            parts: [{ text: "He was just 16 years old." }],
          },
          {
            role: "user",
            parts: [{ text: "What is his full name?" }],
          },
          {
            role: "model",
            parts: [{ text: "His full name is Sachin Ramesh Tendulkar." }],
          },
          {
            role: "user",
            parts: [{ text: "What is he known as?" }],
          },
          {
            role: "model",
            parts: [{ text: "He is known as the 'God of Cricket'." }],
          },
          {
            role: "user",
            parts: [{ text: "What is his highest score in ODI cricket?" }],
          },
          {
            role: "model",
            parts: [{ text: "His highest score is 200 not out." }],
          },
          {
            role: "user",
            parts: [{ text: "Against which team did he score 200 runs?" }],
          },
          {
            role: "model",
            parts: [{ text: "He scored it against South Africa." }],
          },
          {
            role: "user",
            parts: [
              {
                text: "How many centuries has he scored in international cricket?",
              },
            ],
          },
          {
            role: "model",
            parts: [
              { text: "He has scored 100 centuries in international cricket." },
            ],
          },
          {
            role: "user",
            parts: [{ text: "How many World Cups has he played?" }],
          },
          {
            role: "model",
            parts: [{ text: "He has played in six World Cups." }],
          },
          {
            role: "user",
            parts: [{ text: "Did he win any World Cup?" }],
          },
          {
            role: "model",
            parts: [{ text: "Yes, he won the ICC Cricket World Cup in 2011." }],
          },
          {
            role: "user",
            parts: [{ text: "How many Test matches has he played?" }],
          },
          {
            role: "model",
            parts: [{ text: "He has played 200 Test matches." }],
          },
          {
            role: "user",
            parts: [{ text: "When did he retire?" }],
          },
          {
            role: "model",
            parts: [{ text: "He retired in November 2013." }],
          },
          {
            role: "user",
            parts: [{ text: "Where was his last Test match played?" }],
          },
          {
            role: "model",
            parts: [{ text: "His last Test match was played in Mumbai." }],
          },
          {
            role: "user",
            parts: [
              { text: "What award did he receive from the Indian government?" },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "He received the Bharat Ratna, India's highest civilian award.",
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: "What was his jersey number?" }],
          },
          {
            role: "model",
            parts: [{ text: "His jersey number was 10." }],
          },
          {
            role: "user",
            parts: [
              { text: "How many runs did he score in international cricket?" },
            ],
          },
          {
            role: "model",
            parts: [
              { text: "He scored over 34,000 runs in international cricket." },
            ],
          },
          {
            role: "user",
            parts: [{ text: "What was his role in the team?" }],
          },
          {
            role: "model",
            parts: [
              { text: "He was a top-order batsman and sometimes bowled." },
            ],
          },
          {
            role: "user",
            parts: [{ text: "How many wickets did he take in ODI cricket?" }],
          },
          {
            role: "model",
            parts: [{ text: "He took 154 wickets in ODI cricket." }],
          },
          {
            role: "user",
            parts: [{ text: "Which stadium is associated with him?" }],
          },
          {
            role: "model",
            parts: [
              {
                text: "The Wankhede Stadium in Mumbai is closely associated with him.",
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: "What is his autobiography called?" }],
          },
          {
            role: "model",
            parts: [
              { text: "His autobiography is called 'Playing It My Way'." },
            ],
          },
          {
            role: "user",
            parts: [{ text: "Did he captain the Indian cricket team?" }],
          },
          {
            role: "model",
            parts: [
              { text: "Yes, he captained the Indian team for a brief period." },
            ],
          },
          {
            role: "user",
            parts: [{ text: "Who is his favorite bowler?" }],
          },
          {
            role: "model",
            parts: [
              { text: "He has mentioned Shane Warne as one of his favorites." },
            ],
          },
          {
            role: "user",
            parts: [{ text: "Who is his favorite cricketer?" }],
          },
          {
            role: "model",
            parts: [{ text: "He has often admired Sir Donald Bradman." }],
          },
          {
            role: "user",
            parts: [{ text: "What is his favorite shot?" }],
          },
          {
            role: "model",
            parts: [{ text: "His favorite shot is the straight drive." }],
          },
          {
            role: "user",
            parts: [{ text: "Which IPL team did he play for?" }],
          },
          {
            role: "model",
            parts: [{ text: "He played for the Mumbai Indians." }],
          },
          {
            role: "user",
            parts: [{ text: "What is his connection with UNICEF?" }],
          },
          {
            role: "model",
            parts: [{ text: "He is a UNICEF Goodwill Ambassador." }],
          },
          {
            role: "user",
            parts: [{ text: "What is unique about his 100th century?" }],
          },
          {
            role: "model",
            parts: [
              {
                text: "It was scored against Bangladesh in 2012, making him the only cricketer to reach this milestone.",
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: "What did he do after retiring?" }],
          },
          {
            role: "model",
            parts: [
              {
                text: "He has been involved in philanthropy and mentoring young cricketers.",
              },
            ],
          },
          {
            role: "user",
            parts: [{ text: "Who is MS Dhoni ?" }],
          },
          {
            role: "model",
            parts: [
              {
                text: "MS Dhoni is an indian cricketer",
              },
            ],
          },
        ],
      })
      const response = (await result.sendMessage(prompt)).response.text()
      await this.commandBus.execute<CreateQueryCommand, Query>(
        new CreateQueryCommand(workspaceId, prompt, response)
      )
      return { response }
    } catch (error) {
      throw error
    }
  }
}
