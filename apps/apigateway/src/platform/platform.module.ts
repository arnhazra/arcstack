import { Module } from '@nestjs/common';
import { ModelsModule } from './models/models.module';
import { ThreadsModule } from './threads/threads.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [ModelsModule, ThreadsModule, FavouritesModule]
})
export class PlatformModule {}
