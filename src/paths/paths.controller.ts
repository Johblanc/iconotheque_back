import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Bind,
} from '@nestjs/common';
import { PathsService } from './paths.service';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
import { AdminAuthGuard } from 'src/auth/admin_guard/admin-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserAuthGuard } from 'src/auth/user_guard/user-auth.guard';
import { ParseIntPipe } from '@nestjs/common/pipes';

/**
 * Routage et contrôle des requete pour la table paths
 *
 * @v1 **create**           : Demande de création d'un path
 * @v1 **findAllPublics**   : Demande de récupération des paths publiques
 * @v1 **findAllPrivates**  : Demande de récupération des paths privés d'un utilisateur
 *
 * @version v1
 */
@Controller('paths')
export class PathsController {
  constructor(private readonly pathsService: PathsService) {}

  /**
   * Demande de création d'un path
   *
   * @param createPathDto paramètres de création d'un path
   * @param user l'auteur
   * @returns le nouveau path
   *
   * @version v1
   */
  @UseGuards(AdminAuthGuard)
  @Post()
  async create(@Body() createPathDto: CreatePathDto, @GetUser() user: User) {
    return {
      message: "Création d'un nouveau Path",
      data: await this.pathsService.create(createPathDto, user)
    };
  }

  /**
   * Demande de récupération des paths publiques
   * 
   * @returns les paths publiques
   * 
   * @version v1
   */
  @UseGuards(UserAuthGuard)
  @Get()
  async findAllPublics() {
    return {
      message: "Récupération des paths publiques",
      data: await this.pathsService.findAllPublics()
    };
  }

  /**
   * Demande de récupération des paths privés d'un utilisateur
   * 
   * @param user Demandeur
   * @returns les paths privés du demandeur
   * 
   * @version v1
   */
  @UseGuards(AdminAuthGuard)
  @Get('privates')
  async findAllPrivates(@GetUser() user: User) {
    return {
      message: "Récupération de vos paths privés",
      data: await this.pathsService.findAllPrivates(user)
    };
  }

}
