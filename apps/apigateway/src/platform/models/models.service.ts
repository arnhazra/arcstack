import { Injectable } from "@nestjs/common"

@Injectable()
export class ModelsService {
  create(createModelDto: any) {
    return "This action adds a new model"
  }

  findAll() {
    return `This action returns all models`
  }

  findOne(id: number) {
    return `This action returns a #${id} model`
  }

  update(id: number, updateModelDto: any) {
    return `This action updates a #${id} model`
  }

  remove(id: number) {
    return `This action removes a #${id} model`
  }
}
