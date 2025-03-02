import { Injectable } from "@nestjs/common"
import { FindNewsResponseDto } from "./dto/find-news.response.dto"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"
import { newsAPIURI } from "@/shared/constants/other-constants"

@Injectable()
export class NewsRoomService {
  constructor(private readonly httpService: HttpService) {}

  async getNewsArticles(): Promise<FindNewsResponseDto> {
    const response = await lastValueFrom(
      this.httpService.get<FindNewsResponseDto>(newsAPIURI)
    )
    return response.data
  }
}
