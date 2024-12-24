import { IsNotEmpty } from "class-validator"

export class FindAllModelsDto {
  readonly searchQuery?: string

  @IsNotEmpty()
  readonly selectedFilter: string

  readonly selectedSortOption?: string
  readonly offset?: number
  readonly limit?: number
}
