import { CreateBaseModelDto } from "../../dto/request/create-base-model.request.dto"

export class CreateBaseModelCommand {
  constructor(public readonly createBaseModelDto: CreateBaseModelDto) {}
}
