import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from "@nestjs/common"
import { BaseModelService } from "./basemodel.service"
import { TokenGuard } from "@/shared/auth/token.guard"
import { CreateBaseModelDto } from "./dto/create-base-model.request.dto"

@Controller("basemodel")
export class BaseModelController {
  constructor(private readonly service: BaseModelService) {}

  @UseGuards(TokenGuard)
  @Post()
  async createBaseModel(@Body() createBaseModelDto: CreateBaseModelDto) {
    try {
      return await this.service.createBaseModel(createBaseModelDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get()
  async findBaseModels() {
    try {
      return await this.service.findAllBaseModels()
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get(":baseModelId")
  async findOneBaseModel(@Param("baseModelId") baseModelId: string) {
    try {
      return await this.service.findOneBaseModel(baseModelId)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
