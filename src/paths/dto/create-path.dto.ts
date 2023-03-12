import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString , Validate} from "class-validator";
import { IsViewbox } from "src/paths/dto/validators/isViewbox";
import { IsDrawn } from "./validators/isDrawn";

/**
 * Contrôle des paramètres de création d'un path
 * 
 * @version v1
 */
export class CreatePathDto {

  /** Nom du Path */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name : string ;


  /** Chemin du Path */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Validate(IsDrawn)
  d : string ;


  /** Cadre du Path */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Validate(IsViewbox)
  viewbox : string ;
}
