import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, IsNumber, Min, Max, IsHexColor, Length } from "class-validator";

/**
 * Contrôle des paramètres de création d'un utilisateur
 * 
 * @version v2
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

  /** Couleur du Theme */
  @ApiProperty()
  @IsHexColor()
  @Length(7,7)
  theme_color : string ;

  /** Transparence du Theme */
  @ApiProperty()
  @IsNumber({maxDecimalPlaces : 2})
  @Min(0)
  @Max(1)
  theme_relief : number ;

}
