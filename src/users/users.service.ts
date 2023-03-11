import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';


/**
 * Liaison avec la table users de la BDD
 * 
 * *@v1 **create** : Demande de création d'un utilisateur
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
  async create(createUserDto: CreateUserDto) {
    return await User.create({...createUserDto}).save();
  }

}
