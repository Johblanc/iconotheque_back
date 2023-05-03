import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsFigure } from 'src/paths/dto/validators/IsFigure';
import { IsOrdered } from 'src/paths/dto/validators/IsOrdered';
import { IsViewbox } from 'src/paths/dto/validators/isViewbox';

export class CreateIconDto {
  /** Nom de l'Icône */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  /** Cadre de l'Icône */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Validate(IsViewbox)
  viewbox: string;

  /** Les Figures */
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @Validate( IsFigure, { each: true })
  @Validate( IsOrdered )
  figures: {
    order: number;
    path: { id: number };
    aspect: { id: number };
  }[];
}
