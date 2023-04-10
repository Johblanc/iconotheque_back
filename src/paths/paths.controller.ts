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
  NotFoundException,
} from '@nestjs/common';
import { PathsService } from './paths.service';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserAuthGuard } from 'src/auth/user_guard/user-auth.guard';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ForbiddenException } from '@nestjs/common/exceptions';

/**
 * Routage et contrôle des requete pour la table paths
 *
 * @v1 **create**           : Demande de création d'un path
 * @v1 **findAllPublics**   : Demande de récupération des paths publiques
 * @v1 **findAllPrivates**  : Demande de récupération des paths privés d'un utilisateur
 * @v1 **update**           : Demande de modification d'un path
 * @v1 **publish**          : Demande de publication d'un path
 * @v1 **remove**           : Demande de suppression d'un path
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
  @UseGuards(UserAuthGuard)
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
  @UseGuards(UserAuthGuard)
  @Get('privates')
  async findAllPrivates(@GetUser() user: User) {
    return {
      message: "Récupération de vos paths privés",
      data: await this.pathsService.findAllPrivates(user)
    };
  }

  /**
   * Demande de modification d'un path
   * 
   * @param id identifiant du path à modifier
   * @param user Demandeur
   * @param updatePathDto paramètres de modification du path
   * @returns Le path modifié
   * 
   * @version v1
   */
  @UseGuards(UserAuthGuard)
  @Patch(':id')
  @Bind(Param('id', ParseIntPipe))
  async update(@Param('id') id: string, @GetUser() user: User, @Body() updatePathDto: UpdatePathDto) {

    const path = await this.pathsService.findOneById(+id)

    if (path === null){
      throw new NotFoundException("Ce path n'existe pas")
    }
    if (path.user.id !== user.id){
      throw new ForbiddenException("Ce path ne vous appartient pas")
    }

    return {
      message: "Modification du Path",
      data: await this.pathsService.update(+id, updatePathDto)
    };
  }

  /**
   * Demande de publication d'un path
   * 
   * @param id identifiant du path à publier
   * @param user Demandeur
   * @returns Le path publié
   * 
   * @version v1
   */
  @UseGuards(UserAuthGuard)
  @Patch('publish/:id')
  @Bind(Param('id', ParseIntPipe))
  async publish(@Param('id') id: string, @GetUser() user: User) {

    const path = await this.pathsService.findOneById(+id)

    if (path === null){
      throw new NotFoundException("Ce path n'existe pas")
    }
    if (path.user.id !== user.id){
      throw new ForbiddenException("Ce path ne vous appartient pas")
    }

    return {
      message: "Publication du Path",
      data: await this.pathsService.publish(+id)
    };
  }

  /**
   * Demande de suppression d'un path
   * 
   * @param id identifiant du path à supprimer
   * @param user Demandeur
   * @returns Le Path supprimé
   * 
   * @version v1
   */
  @UseGuards(UserAuthGuard)
  @Delete(':id')
  @Bind(Param('id', ParseIntPipe))
  async remove(@Param('id') id: string, @GetUser() user: User) {

    const path = await this.pathsService.findOneById(+id)

    if (path === null){
      throw new NotFoundException("Ce path n'existe pas")
    }
    if (path.user.id !== user.id && user.access === 1){
      throw new ForbiddenException("Ce path ne vous appartient pas")
    }
    await this.pathsService.remove(+id)
    return {
      message: "Suppression du Path",
      data: path
    };
  }
}
