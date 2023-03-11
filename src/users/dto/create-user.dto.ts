import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

/**
 * Contrôle des paramètres de création d'un utilisateur
 * 
 * @version v1
 */
export class CreateUserDto {

  @ApiProperty()
  @IsString()
  name : string ;

  @ApiProperty()
  @IsEmail()
  mail : string ;

  @ApiProperty()
  @IsString()
  password : string ;

}
