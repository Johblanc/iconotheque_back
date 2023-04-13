import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

/**
 * Vérification du mot de passe et création du token pour le login
 * 
 * @version v1
 */
@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}

  /**
   * Vérication de mot de passe
   * @param name le nom de l'utilisateur
   * @param password le mot de passe de l'utilisateur
   * @returns l'utilisateur sans mot de passe
   * 
   * @version v2
   */
  async validateUser(name: string, password: string): Promise<any> {
    const user = await User.findOne({
      where : {name}, 
      select : {
        id : true ,
        name : true ,
        password : true,
        mail : true,
        access : true,
        theme_color : true,
        theme_relief : true
      }});
    const isOk = await bcrypt.compare( password, user ? user.password : "");

    if (user && isOk) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Création du token
   * 
   * @param user L'utilisateur pour lequel le token doit être créé
   * @returns le nouveau token
   * 
   * @version v1
   */
  token(user: User) {
    
    const payload = { name: user.name, sub: user.id };
    
    return this.jwtService.sign(payload)
  }
}