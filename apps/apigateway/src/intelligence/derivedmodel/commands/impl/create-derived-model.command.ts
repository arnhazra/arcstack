import { CreateDerivedModelDto } from "../../dto/request/create-derived-model.request.dto"

export class CreateDerivedModelCommand {
  constructor(
    public readonly userId: string,
    public readonly createDerivedModelDto: CreateDerivedModelDto
  ) {}
}
