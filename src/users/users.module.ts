import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';


/**
 * Liaison entre controller et services pour la table users
 * 
 * @version v1
 */
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
