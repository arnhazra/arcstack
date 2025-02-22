import {
  Controller,
  Post,
  BadRequestException,
  Body,
  UseGuards,
} from "@nestjs/common"
import { ActivityService } from "./activity.service"
import { CreateActivityDto } from "./dto/create-activity.dto"
import { EventsUnion } from "../../shared/utils/events.union"
import { OnEvent } from "@nestjs/event-emitter"
import { GetCountDto } from "./dto/get-count.dto"
import { TokenGuard } from "@/shared/auth/token.guard"

@Controller("activity")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @OnEvent(EventsUnion.CreateActivity)
  createActivity(createActivityDto: CreateActivityDto) {
    this.activityService.createActivity(createActivityDto)
  }

  @UseGuards(TokenGuard)
  @Post("trends")
  async getActivityCount(@Body() getCountDto: GetCountDto) {
    try {
      return await this.activityService.getActivityCount(getCountDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
