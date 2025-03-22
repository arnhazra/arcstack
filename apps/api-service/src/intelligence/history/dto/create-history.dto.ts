import { IsNotEmpty } from "class-validator"

export class CreateHistoryDto {
  @IsNotEmpty()
  userId: string

  @IsNotEmpty()
  modelId: string
}
