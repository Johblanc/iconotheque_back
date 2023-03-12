import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

/**
 * Contrôle des paramètres de création d'un utilisateur
 * 
 * @version v1
 */
export class CreateUserDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name : string ;

  @ApiProperty()
  @IsEmail()
  mail : string ;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password : string ;

}
