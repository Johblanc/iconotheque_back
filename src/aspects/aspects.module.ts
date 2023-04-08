import { Module } from '@nestjs/common';
import { AspectsService } from './aspects.service';
import { AspectsController } from './aspects.controller';

@Module({
  controllers: [AspectsController],
  providers: [AspectsService]
})
export class AspectsModule {}
