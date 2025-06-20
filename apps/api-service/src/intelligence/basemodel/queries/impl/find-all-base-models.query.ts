import { FindBaseModelsDto } from "../../dto/find-dervied-models.request.dto"

export class FindAllBaseModelsQuery {
  constructor(public readonly findAllBaseModelsDto: FindBaseModelsDto) {}
}
