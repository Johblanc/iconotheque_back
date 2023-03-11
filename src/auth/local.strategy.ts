import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';


/**
 * Vérification des parametres de l'utilisateur lors du login
 * 
 * @version v1
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'name',});
  }

/**
 * Vérification des parametres de l'utilisateur lors du login
 * 
 * @param name le nom de l'utilisateur
 * @param password le mot de passe de l'utilisateur
 * @returns l'utilisateur vérifié
 * 
 * @version v1
 */
  async validate(name: string, password: string): Promise<any> {
    
    const user = await this.authService.validateUser(name, password);
    if (!user) {
      throw new UnauthorizedException("Vous n'êtes pas enregisté");
    }
    return user;
  }
}