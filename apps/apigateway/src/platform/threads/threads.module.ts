import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
