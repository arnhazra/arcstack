import { BaseModel } from "@/intelligence/basemodel/schemas/basemodel.schema"

export class DerivedModelResponseDto {
  _id: string
  displayName: string
  description: string
  category: string
  baseModel: BaseModel
  isFineTuned: boolean
  promptStyle: string
  systemPrompt: string
  responseFormat: string
}
