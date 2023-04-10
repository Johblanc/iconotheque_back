import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { IsViewbox } from "src/paths/dto/validators/isViewbox";

export class CreateIconDto {

  /** Nom de l'Icône */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name : string ;


  /** Cadre de l'Icône */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Validate(IsViewbox)
  viewbox : string ;

}
