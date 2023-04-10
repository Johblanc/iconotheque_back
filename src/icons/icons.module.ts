import { Module } from '@nestjs/common';
import { IconsService } from './icons.service';
import { IconsController } from './icons.controller';
import { FiguresService } from 'src/figures/figures.service';
import { PathsService } from 'src/paths/paths.service';
import { AspectsService } from 'src/aspects/aspects.service';

@Module({
  controllers: [IconsController],
  providers: [IconsService,FiguresService,PathsService,AspectsService]
})
export class IconsModule {}
