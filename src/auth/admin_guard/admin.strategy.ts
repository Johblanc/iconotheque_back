import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy,"admin") {
  constructor(private readonly usersService : UsersService) {
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWTCONSTANTS,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOneByToken(payload)
    
    if (user === null ){
      throw new UnauthorizedException("Vous n'êtes pas enregistré")
    }
    if (user.access <2){
      throw new UnauthorizedException("Vous n'avez le niveau d'acces")
    }
    return user;
  }
}