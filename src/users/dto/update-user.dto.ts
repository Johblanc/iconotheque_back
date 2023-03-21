import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";


/**
 * Contrôle des paramètres de modification d'un utilisateur
 * 
 * @version v1
 */
export class UpdateUserDto extends PartialType(CreateUserDto){ }
