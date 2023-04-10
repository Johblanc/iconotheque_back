import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PathsModule } from './paths/paths.module';
import { User } from './users/entities/user.entity';
import { Path } from './paths/entities/path.entity';
import { AuthModule } from './auth/auth.module';
import { IconsModule } from './icons/icons.module';
import { AspectsModule } from './aspects/aspects.module';
import { Icon } from './icons/entities/icon.entity';
import { Figure } from './figures/entities/figure.entity';
import { Aspect } from './aspects/entities/aspect.entity';

/**
 * Permet la liaison entre la base de données, les Entities et les Controleurs.
 * 
 * @version v2
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User, 
        Path,
        Icon,
        Figure,
        Aspect
      ],
      synchronize: true,
    }),
    UsersModule,
    PathsModule,
    AuthModule,
    IconsModule,
    AspectsModule
  ],
})
export class AppModule {}
