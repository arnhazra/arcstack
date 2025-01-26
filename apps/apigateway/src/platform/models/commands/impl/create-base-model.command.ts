import { CreateBaseModelDto } from "../../dto/create-base-model.dto"

export class CreateBaseModelCommand {
  constructor(public readonly createBaseModelDto: CreateBaseModelDto) {}
}
