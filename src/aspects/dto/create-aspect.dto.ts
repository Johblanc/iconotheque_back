import { ApiProperty } from "@nestjs/swagger";
import { IsHexColor, IsNumber, IsString, Length, Max, Min } from "class-validator";


/**
 * Contrôle des paramètres de création d'un Aspect
 * 
 * @version v2
 */
export class CreateAspectDto {


  /** Nom de l'Aspect */
  @ApiProperty()
  @IsString()
  name : string ;

  /** Couleur de remplissage */
  @ApiProperty()
  @IsHexColor()
  @Length(7,7)
  fill_color : string ;

  /** Opacité de remplissage */
  @ApiProperty()
  @IsNumber({maxDecimalPlaces : 2})
  @Min(0)
  @Max(1)
  fill_opacity : number ;

  /** Couleur de bordure */
  @ApiProperty()
  @IsHexColor()
  @Length(7,7)
  stroke_color : string ;

  /** Opacité de bordure */
  @ApiProperty()
  @IsNumber({maxDecimalPlaces : 2})
  @Min(0)
  @Max(1)
  stroke_opacity : number ;

  /** Epaiseur de bordure */
  @ApiProperty()
  @IsNumber()
  @Min(0)
  stroke_width : number ;
}
