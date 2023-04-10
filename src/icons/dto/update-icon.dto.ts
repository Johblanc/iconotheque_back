import { PartialType } from '@nestjs/swagger';
import { CreateIconDto } from './create-icon.dto';

export class UpdateIconDto extends PartialType(CreateIconDto) {}
