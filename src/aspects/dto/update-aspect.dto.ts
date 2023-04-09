import { PartialType } from '@nestjs/swagger';
import { CreateAspectDto } from './create-aspect.dto';

export class UpdateAspectDto extends PartialType(CreateAspectDto) {}
