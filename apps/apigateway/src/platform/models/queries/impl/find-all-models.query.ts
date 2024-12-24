import { FindAllModelsDto } from "../../dto/find-all-models.dto"

export class FindAllModelsQuery {
  constructor(public readonly findAllModelsDto: FindAllModelsDto) {}
}
