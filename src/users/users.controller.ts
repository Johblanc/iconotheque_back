import { Controller, Post, Body, ConflictException, UseGuards, Patch, Get, Param, Bind, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local_guard/local-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAuthGuard } from 'src/auth/user_guard/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin_guard/admin-auth.guard';

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
   * @param dto parametre de création d'un utilisateur
   * @returns le nouvel utilisateur
   * 
   * @version v1
   */
  @Post('register')
  async register(@Body() dto: CreateUserDto) {

    const nameExist = await this.usersService.findOneByName(dto.name);

    if (nameExist) {
      throw new ConflictException("Ce Nom est déjà enregistré");
    }
    
    const mailExist = await this.usersService.findOneByMail(dto.mail);

    if (mailExist) {
      throw new ConflictException("Ce Mail est déjà enregistré");
    }

    dto.password = await bcrypt.hash(dto.password, 10);
    
    const newUser = await this.usersService.create(dto);
    return {
      message: `${dto.name} bien enregistré`,
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


  /**
   * Demande de modification d'un utilisateur
   * 
   * @param user L'utilidateur donné par le token
   * @param dto parametre de modification d'un utilisateur
   * @returns L'utilidateur et le token
   * 
   * @version v1
   */
  @UseGuards(UserAuthGuard)
  @Patch()
  async update(@GetUser() user : User,@Body() dto: UpdateUserDto) {

    if (dto.name){
      const nameExist = await this.usersService.findOneByName(dto.name);
  
      if (nameExist && nameExist.name !== user.name) {
        throw new ConflictException("Ce Nom est déjà enregistré");
      }
      
    }
    if (dto.mail){
      const mailExist = await this.usersService.findOneByMail(dto.mail);
      
      if (mailExist && mailExist.mail !== user.mail) {
        throw new ConflictException("Ce Mail est déjà enregistré");
      }
    }
    if (dto.password){
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const {password,...updateUser} = await this.usersService.update(user,dto)
    
    return {
      message : "Profile mis à jour" ,
      data : {...updateUser, token : this.authService.token(user)}
    };
  }


  /**
   * Récupération de tous les utilisateurs
   * 
   * @returns Tous les utilisateurs
   * 
   * @version v1
   */
  @UseGuards(AdminAuthGuard)
  @Get()
  async findAllUsers(){
    return {
      message : "Tous les utilisateurs" ,
      data : await this.usersService.findAll()
    };
  }


  /**
   * Promouvoir un utilisateur
   * 
   * @returns Tous les utilisateurs
   * 
   * @version v1
   */
  @UseGuards(AdminAuthGuard)
  @Get("promote/:id")
  @Bind(Param('id', ParseIntPipe))
  async promote(@Param() id : string){
    const user = await this.usersService.findOneById(+id)
    if (user === null){
      throw new NotFoundException("L'utilisateur n'est pas enregistré")
    }
    return {
      message : "Promotion d'un utilisateur" ,
      data : await this.usersService.promote(user)
    };
  }
}