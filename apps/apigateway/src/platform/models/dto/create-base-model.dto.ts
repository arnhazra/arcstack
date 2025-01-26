import { IsNotEmpty } from "class-validator"

export class CreateBaseModelDto {
  @IsNotEmpty()
  readonly displayName: string

  @IsNotEmpty()
  readonly genericName: string

  @IsNotEmpty()
  readonly series: string

  @IsNotEmpty()
  readonly vendor: string
}
