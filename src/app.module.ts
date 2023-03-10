import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PathsModule } from './paths/paths.module';
import { User } from './users/entities/user.entity';
import { Path } from './paths/entities/path.entity';

/**
 * Permet la liaison entre la base de données, les Entities et les Controleurs.
 * 
 * @version v0
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
        Path
      ],
      synchronize: true,
    }),
    UsersModule,
    PathsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
