import { Injectable } from "@nestjs/common"

@Injectable()
export class ThreadsService {
  create(createThreadDto: any) {
    return "This action adds a new thread"
  }

  findAll() {
    return `This action returns all threads`
  }

  findOne(id: number) {
    return `This action returns a #${id} thread`
  }

  update(id: number, updateThreadDto: any) {
    return `This action updates a #${id} thread`
  }

  remove(id: number) {
    return `This action removes a #${id} thread`
  }
}
