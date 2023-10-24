import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateDocumentationDto } from "./dto/create-documentation.dto"
import { DocumentationRepository } from "./documentation.repository"

@Injectable()
export class DocumentationService {
  constructor(private readonly documentationRepository: DocumentationRepository) { }
  async createDocumentation(createDocumentationDto: CreateDocumentationDto) {
    try {
      const { appName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody } = createDocumentationDto
      await this.documentationRepository.create(appName, apiName, apiUri, apiMethod, sampleRequestBody, sampleResponseBody)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getDocumentationByAppName(appName: string) {
    try {
      const docList = await this.documentationRepository.findAllByAppName(appName)
      return docList
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}