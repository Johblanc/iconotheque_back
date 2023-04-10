import { PartialType } from '@nestjs/swagger';
import { CreateFigureDto } from './create-figure.dto';

export class UpdateFigureDto extends PartialType(CreateFigureDto) {}
