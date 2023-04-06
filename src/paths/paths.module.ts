import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';

@Module({
  controllers: [PathsController],
  providers: [PathsService]
})
export class PathsModule {}
