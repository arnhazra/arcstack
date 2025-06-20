import { User } from "@/core/user/schemas/user.schema"
import { BaseModel } from "@/intelligence/basemodel/schemas/basemodel.schema"

export class BaseModelResponseDto {
  _id: string
  displayName: string
  description: string
  category: string
  baseModel: BaseModel
  modelOwner: User
  isFineTuned: boolean
  systemPrompt: string
  responseFormat: string
  hasWebSearchCapability: boolean
  isPublic: boolean
}
