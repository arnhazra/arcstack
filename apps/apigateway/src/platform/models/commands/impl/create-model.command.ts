import { CreateModelDto } from "../../dto/create-model.dto"

export class CreateModelCommand {
  constructor(public readonly createModelDto: CreateModelDto) {}
}
