import { Injectable } from "@nestjs/common"
import { FindNewsResponseDto } from "./dto/find-news.response.dto"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"
import { config } from "@/config"

@Injectable()
export class NewsRoomService {
  constructor(private readonly httpService: HttpService) {}

  async getNewsArticles(): Promise<FindNewsResponseDto> {
    const response = await lastValueFrom(
      this.httpService.get<FindNewsResponseDto>(config.NEWS_API_URI)
    )
    return response.data
  }
}
