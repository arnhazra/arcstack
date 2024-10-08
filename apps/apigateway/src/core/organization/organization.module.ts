import { Module } from "@nestjs/common"
import { OrganizationService } from "./organization.service"
import { OrganizationController } from "./organization.controller"
import { CqrsModule } from "@nestjs/cqrs"
import { Organization, OrganizationSchema } from "./schemas/organization.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { OrganizationRepository } from "./organization.repository"
import { CreateOrganizationCommandHandler } from "./commands/handler/create-organization.handler"
import { DeleteOrganizationCommandHandler } from "./commands/handler/delete-organization.handler"
import { FindAllOrgQueryHandler } from "./queries/handler/find-all-org.handler"
import { FindOrgByCredentialQueryHandler } from "./queries/handler/find-org-by-credential.handler"
import { FindOrgByIdQueryHandler } from "./queries/handler/find-org-by-id.handler"
import { UpdateOrganizationCommandHandler } from "./commands/handler/update-organization.handler"
import { DatabaseModule } from "src/shared/database/database.module"

@Module({
  imports: [
    CqrsModule,
    DatabaseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }], DbConnectionMap.Core),
  ],
  controllers: [OrganizationController],
  providers: [
    OrganizationService, OrganizationRepository,
    CreateOrganizationCommandHandler, DeleteOrganizationCommandHandler,
    FindAllOrgQueryHandler, FindOrgByCredentialQueryHandler,
    FindOrgByIdQueryHandler, UpdateOrganizationCommandHandler
  ],
})

export class OrganizationModule { }
