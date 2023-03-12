import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PathsService } from './paths.service';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
import { AdminAuthGuard } from 'src/auth/admin_guard/admin-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

/**
 * Routage et contrôle des requete pour la table paths
 *
 * * **create** : Demande de création d'un path
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
      data: await this.pathsService.create(createPathDto, user),
    };
  }

}
