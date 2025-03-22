import { IsNotEmpty } from "class-validator"

export class AIGenerationDto {
  @IsNotEmpty()
  modelId: string

  @IsNotEmpty()
  prompt: string

  threadId: string
  temperature: number
  topP: number
  useWebSearch: boolean
}
