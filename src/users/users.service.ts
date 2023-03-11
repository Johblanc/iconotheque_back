import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';


/**
 * Liaison avec la table users de la BDD
 * 
 * *@v1 **create**          : Demande de création d'un utilisateur
 * *@v1 **findOneByName**   : Trouver un utilisateur par son nom
 * *@v1 **findOneByMail**   : Trouver un utilisateur par son mail
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


  /**
   * Trouver un utilisateur par son mail
   * 
   * @param mail email de l'utilisateur recherché
   * @returns l'utilisateur, si il existe, sinon null
   * 
   * @version v1
   */
  async findOneByMail(mail : string) : Promise<User | null>
  {
    return await User.findOneBy({mail})
  }


  /**
   * Trouver un utilisateur par token
   * 
   * @param token token de l'utilisateur recherché
   * @returns l'utilisateur, si il existe, sinon null
   * 
   * @version v1
   */
  async findOneByToken(token : { name: string, sub: number, iat: number }) : Promise<User | null>
  {
    return await User.findOneBy({name : token.name, id : token.sub})
  }

}
