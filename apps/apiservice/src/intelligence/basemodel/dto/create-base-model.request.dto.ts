import { IsNotEmpty } from "class-validator"

export class CreateBaseModelDto {
  @IsNotEmpty()
  readonly displayName: string

  @IsNotEmpty()
  readonly genericName: string

  @IsNotEmpty()
  readonly series: string

  @IsNotEmpty()
  readonly provider: string

  @IsNotEmpty()
  parameters: string

  @IsNotEmpty()
  contextWindow: string

  @IsNotEmpty()
  readonly isPro: boolean

  @IsNotEmpty()
  architecture: string
}
