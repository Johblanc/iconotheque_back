import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule } from '@nestjs/config';



@Module({ 
  imports: [
    ConfigModule.forRoot(), 
    forwardRef(() =>UsersModule), 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWTCONSTANTS,
    })
  ],
  providers: [AuthService ],
  exports: [AuthService],
})
export class AuthModule {}
