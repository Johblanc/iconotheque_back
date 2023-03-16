import { Controller, Post, Body, ConflictException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local_guard/local-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './entities/user.entity';

/**
 * Routage et contrôle des requete pour la table users
 * 
 * * **register** : Demande d'enregistrement d'un utilisateur
 * * **login** :Demande de d'authentification d'un utilisateur
 * 
 * @version v1
 */
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
    ) {}

  /**
   * Demande d'enregistrement d'un utilisateur
   * 
   * @param createUserDto parametre de création d'un utilisateur
   * @returns le nouvel utilisateur
   * 
   * @version v1
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {

    const nameExist = await this.usersService.findOneByName(createUserDto.name);

    if (nameExist) {
      throw new ConflictException("Ce Nom est déjà enregistré");
    }
    
    const mailExist = await this.usersService.findOneByMail(createUserDto.mail);

    if (mailExist) {
      throw new ConflictException("Ce Mail est déjà enregistré");
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    
    const newUser = await this.usersService.create(createUserDto);
    return {
      message: `${createUserDto.name} bien enregistré`,
      data: newUser,
    };
  }

  /**
   * Demande de d'authentification d'un utilisateur (Voir LocalAuthGuard)
   * 
   * @param user L'utilidateur donné par le token
   * @returns L'utilidateur et le token
   * 
   * @version v1
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() user : User) {
    return {
      message : "Vous êtes connecté" ,
      data : {...user, token : this.authService.token(user)}
    };
  }

}