import { Module } from "@nestjs/common"
import { IntelligenceModule } from "./intelligence/intelligence.module"
import { DatamarketplaceModule } from "./datamarketplace/datamarketplace.module"

@Module({
  imports: [IntelligenceModule, DatamarketplaceModule],
})
export class ProductsModule {}
