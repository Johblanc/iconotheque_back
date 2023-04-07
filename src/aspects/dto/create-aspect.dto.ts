import { ApiProperty } from "@nestjs/swagger";
import { IsHexColor, IsNumber, IsString, Max, Min } from "class-validator";


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
  stroke_width : number ;
}
