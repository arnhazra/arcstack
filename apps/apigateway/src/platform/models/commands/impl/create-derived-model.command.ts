import { CreateDerivedModelDto } from "../../dto/create-derived-model.dto"

export class CreateDerivedModelCommand {
  constructor(public readonly createDerivedModelDto: CreateDerivedModelDto) {}
}
