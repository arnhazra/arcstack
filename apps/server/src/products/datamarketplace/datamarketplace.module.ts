import { Module } from "@nestjs/common"
import { DatamarketplaceService } from "./datamarketplace.service"
import { DatamarketplaceController } from "./datamarketplace.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { MongooseModule } from "@nestjs/mongoose"
import { envConfig } from "src/env.config"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Dataset, DatasetSchema } from "./schemas/dataset.schema"
import { Metadata, MetadataSchema } from "./schemas/metadata.schema"
import { DatamarketplaceRepository } from "./datamarketplace.repository"
import { FindCategoriesQueryHandler } from "./queries/handler/find-categories.handler"
import { FindDataByIdQueryHandler } from "./queries/handler/find-data.handler"
import { FindDatasetsQueryHandler } from "./queries/handler/find-datasets.handler"
import { FindMetaDataByIdQueryHandler } from "./queries/handler/find-metadata.handler"

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot(envConfig.datamarketplaceDatabaseURI, { connectionName: DbConnectionMap.DataMarketplace }),
    MongooseModule.forFeature([
      { name: Dataset.name, schema: DatasetSchema },
      { name: Metadata.name, schema: MetadataSchema }
    ], DbConnectionMap.DataMarketplace),
  ],
  controllers: [DatamarketplaceController],
  providers: [
    DatamarketplaceService,
    DatamarketplaceRepository,
    FindCategoriesQueryHandler,
    FindDataByIdQueryHandler,
    FindDatasetsQueryHandler,
    FindMetaDataByIdQueryHandler
  ],
})
export class DatamarketplaceModule { }
