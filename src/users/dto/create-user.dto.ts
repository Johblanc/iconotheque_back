import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

/**
 * Contrôle des paramètres de création d'un utilisateur
 * 
 * @version v1
 */
export class CreateUserDto {

  /** Nom de l'utilisateur */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name : string ;

  /** Email de l'utilisateur */
  @ApiProperty()
  @IsEmail()
  mail : string ;

  /** Mot de passe de l'utilisateur */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password : string ;

}
