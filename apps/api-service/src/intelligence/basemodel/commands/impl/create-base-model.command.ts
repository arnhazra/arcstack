import { CreateBaseModelDto } from "../../dto/create-base-model.request.dto"

export class CreateBaseModelCommand {
  constructor(public readonly createBaseModelDto: CreateBaseModelDto) {}
}
