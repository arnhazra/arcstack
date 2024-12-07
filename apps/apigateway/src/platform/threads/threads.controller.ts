import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common"
import { ThreadsService } from "./threads.service"

@Controller("threads")
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create(@Body() createThreadDto: any) {
    return this.threadsService.create(createThreadDto)
  }

  @Get()
  findAll() {
    return this.threadsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.threadsService.findOne(+id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateThreadDto: any) {
    return this.threadsService.update(+id, updateThreadDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.threadsService.remove(+id)
  }
}
