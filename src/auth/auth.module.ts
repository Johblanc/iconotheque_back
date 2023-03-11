import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule } from '@nestjs/config';
import { UserStrategy } from './user_guard/user.strategy';
import { AdminStrategy } from './admin_guard/admin.strategy';



@Module({ 
  imports: [
    ConfigModule.forRoot(), 
    forwardRef(() =>UsersModule), 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWTCONSTANTS,
    })
  ],
  providers: [AuthService , LocalStrategy, UserStrategy,AdminStrategy],
  exports: [AuthService],
})
export class AuthModule {}
