import { FindDerivedModelsDto } from "../../dto/request/find-dervied-models.request.dto"

export class FindAllDerivedModelsQuery {
  constructor(public readonly findAllDerivedModelsDto: FindDerivedModelsDto) {}
}
