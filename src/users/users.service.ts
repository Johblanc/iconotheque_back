import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';


/**
 * Liaison avec la table users de la BDD
 * 
 * *@v1 **create**          : Demande de création d'un utilisateur
 * *@v1 **findOneByName**   : Trouver un utilisateur par son nom
 * 
 * @version v1
 */
@Injectable()
export class UsersService 
{

  /**
   * Demande de création d'un utilisateur
   * 
   * @param createUserDto parametre de création d'un utilisateur
   * @returns le nouvel utilisateur
   * 
   * @version v1
   */
  async create(createUserDto: CreateUserDto) : Promise<User>
  {
    return await User.create({...createUserDto}).save();
  }


  /**
   * Trouver un utilisateur par son nom
   * 
   * @param name nom de l'utilisateur recherché
   * @returns l'utilisateur, si il existe, sinon null
   * 
   * @version v1
   */
  async findOneByName(name : string) : Promise<User | null>
  {
    return await User.findOneBy({name})
  }
}
