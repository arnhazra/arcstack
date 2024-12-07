import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common"
import { ModelsService } from "./models.service"

@Controller("models")
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  create(@Body() createModelDto: any) {
    return this.modelsService.create(createModelDto)
  }

  @Get()
  findAll() {
    return this.modelsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.modelsService.findOne(+id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateModelDto: any) {
    return this.modelsService.update(+id, updateModelDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.modelsService.remove(+id)
  }
}
