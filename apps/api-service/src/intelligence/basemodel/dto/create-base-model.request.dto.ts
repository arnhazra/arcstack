import { IsNotEmpty } from "class-validator"

export class CreateBaseModelDto {
  @IsNotEmpty()
  readonly genericName: string

  @IsNotEmpty()
  readonly displayName: string

  @IsNotEmpty()
  readonly description: string

  @IsNotEmpty()
  readonly series: string

  @IsNotEmpty()
  readonly provider: string

  @IsNotEmpty()
  readonly parameters: string

  @IsNotEmpty()
  readonly contextWindow: string

  @IsNotEmpty()
  readonly isPro: boolean
}
