import { Controller, Post, Body, Get, Query, BadRequestException, UseGuards, Param } from "@nestjs/common"
import { DatamarketplaceService } from "./datamarketplace.service"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { DataAPIDto } from "./dto/data-api.dto"
import { TokenGuard } from "src/auth/token.guard"
import { CredentialGuard } from "src/auth/credential.guard"

@Controller("products/datamarketplace")
export class DatamarketplaceController {
  constructor(private readonly datamarketplaceService: DatamarketplaceService) { }

  @UseGuards(TokenGuard)
  @Get("filters")
  async getDatasetFilters() {
    try {
      return await this.datamarketplaceService.getDatasetFilters()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post("finddatasets")
  async findDatasets(@Body() findDatasetsDto: FindDatasetsDto) {
    try {
      return await this.datamarketplaceService.findDatasets(findDatasetsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("viewdataset/:datasetId")
  async viewDataset(@Param() params: any) {
    try {
      return await this.datamarketplaceService.viewDataset(params.datasetId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(CredentialGuard)
  @Post("dataapi")
  async getData(@Body() dataapiDto: DataAPIDto) {
    try {
      return await this.datamarketplaceService.getData(dataapiDto.datasetId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
