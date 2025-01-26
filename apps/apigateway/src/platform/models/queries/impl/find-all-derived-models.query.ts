import { FindDerivedModelsDto } from "../../dto/find-dervied-models.dto"

export class FindAllDerivedModelsQuery {
  constructor(public readonly findAllDerivedModelsDto: FindDerivedModelsDto) {}
}
