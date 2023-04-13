import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

/**
 * Liaison avec la table users de la BDD
 *
 * *@v1 **create**          : Demande de création d'un utilisateur
 * *@v1 **findOneByName**   : Trouver un utilisateur par son nom
 * *@v1 **findOneById**     : Trouver un utilisateur par son identifiant
 * *@v2 **findOneByMail**   : Trouver un utilisateur par son mail
 * *@v2 **findOneByToken**  : Trouver un utilisateur par token
 * *@v2 **update**          : Mise à jour d'un utilisateur
 * *@v1 **findAll**         : Récupération de tous les utilisateurs
 * *@v1 **promote**         : Mise à jour d'un utilisateur
 *
 * @version v2
 */
@Injectable()
export class UsersService {
  /**
   * Demande de création d'un utilisateur
   *
   * @param createUserDto parametres de création d'un utilisateur
   * @returns le nouvel utilisateur
   *
   * @version v1
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await User.create({ ...createUserDto }).save();
  }

  /**
   * Trouver un utilisateur par son nom
   *
   * @param name nom de l'utilisateur recherché
   * @returns l'utilisateur, si il existe, sinon null
   *
   * @version v1
   */
  async findOneByName(name: string): Promise<User | null> {
    return await User.findOneBy({ name });
  }

  /**
   * Trouver un utilisateur par son identifiant
   *
   * @param id identifiant de l'utilisateur recherché
   * @returns l'utilisateur, si il existe, sinon null
   *
   * @version v1
   */
  async findOneById(id: number): Promise<User | null> {
    return await User.findOneBy({ id });
  }

  /**
   * Trouver un utilisateur par son mail
   *
   * @param mail email de l'utilisateur recherché
   * @returns l'utilisateur, si il existe, sinon null
   *
   * @version v2
   */
  async findOneByMail(mail: string): Promise<User | null> {
    return await User.findOne({
      where: { mail },
      select: {
        id: true,
        name: true,
        password: true,
        mail: true,
        access: true,
        theme_color: true,
        theme_relief: true
      },
    });
  }

  /**
   * Trouver un utilisateur par token
   *
   * @param token token de l'utilisateur recherché
   * @returns l'utilisateur, si il existe, sinon null
   *
   * @version v2
   */
  async findOneByToken(token: {
    name: string;
    sub: number;
    iat: number;
  }): Promise<User | null> {
    return await User.findOne({
      where: { name: token.name, id: token.sub },
      select: {
        id: true,
        name: true,
        password: true,
        mail: true,
        access: true,
        theme_color: true,
        theme_relief: true
      },
    });
  }

  /**
   * Mise à jour d'un utilisateur
   *
   * @param user L'utilisateur à mettre à jour
   * @param dto parametres de modification d'un utilisateur
   * @returns l'utilisateur modifié
   *
   * @version v2
   */
  async update(user: User, dto: UpdateUserDto): Promise<User> {
    if (dto.name) user.name = dto.name ;
    if (dto.mail) user.mail = dto.mail ;
    if (dto.password) user.password = dto.password ;
    if (dto.theme_color) user.theme_color = dto.theme_color ;
    if (dto.theme_relief) user.theme_relief = dto.theme_relief ;

    return await user.save();
  }
  

  /**
   * Récupération de tous les utilisateurs
   *
   * @returns Tous les utilisateurs
   *
   * @version v1
   */
  async findAll(): Promise<User[]> {
    return await User.find();
  }
  

  /**
   * Promotion d'un utilisateur en Admin
   *
   * @returns Tous les utilisateurs
   *
   * @version v1
   */
  async promote(user : User): Promise<User> {
    user.access = 2 ;
    return await user.save();
  }
}
