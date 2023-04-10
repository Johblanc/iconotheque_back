import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IconsService } from './icons.service';
import { CreateIconDto } from './dto/create-icon.dto';
import { UpdateIconDto } from './dto/update-icon.dto';
import { Bind, UseGuards } from '@nestjs/common/decorators';
import { UserAuthGuard } from 'src/auth/user_guard/user-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';

/**
 * Routage et contrôle des requete pour la table icons
 *
 * @v2 **create**           : Demande de création d'une Icône
 * @v2 **findAllPublics**   : Demande de récupération des icônes publiques
 * @v2 **findAllPrivates**  : Demande de récupération de tous les icônes privées d'un user
 *
 * @version v2
 */
@Controller('icons')
export class IconsController {
  constructor(private readonly iconsService: IconsService) {}

  /**
   * Demande de création d'une Icône
   *
   * @param createIconDto paramètres de création d'une Icône
   * @param user l'auteur
   * @returns la nouvelle Icône
   *
   * @version v2
   */
  @UseGuards(UserAuthGuard)
  @Post()
  async create(@Body() createIconDto: CreateIconDto, @GetUser() user: User) {
    return {
      message: "Création d'une nouvelle Icône",
      data: await this.iconsService.create(createIconDto, user)
    };
  }

  /**
   * Demande de récupération des icônes publiques
   * 
   * @returns les icônes publiques
   * 
   * @version v2
   */
  @Get()
  async findAllPublics() {
    return {
      message: "Récupération des paths publiques",
      data: await this.iconsService.findAllPublics()
    };
  }

  /**
   * Demande de récupération de tous les icônes privées d'un user
   * 
   * @param user l'auteur des icônes
   * @returns Liste de tous les icônes privées
   * 
   * @version v2
   */
  @UseGuards(UserAuthGuard)
  @Get('privates')
  async findAllPrivates(@GetUser() user: User) {
    return {
      message: "Récupération de vos icônes privées",
      data: await this.iconsService.findAllPrivates(user)
    };
  }


  /**
   * Demande de modification d'une icône
   * 
   * @param id identifiant de l'icône à modifier
   * @param user Demandeur
   * @param updateIconDto paramètres de modification de l'icône
   * @returns L'icône modifiée
   * 
   * @version v2
   */
  @UseGuards(UserAuthGuard)
  @Patch(':id')
  @Bind(Param('id', ParseIntPipe))
  async update(@Param('id') id: string, @GetUser() user: User, @Body() updateIconDto: UpdateIconDto) {
    
    const icon = await this.iconsService.findOneById(+id) ;

    if (icon === null) {
      throw new NotFoundException("Cette icône n'existe pas")
    }
    
    if (icon.user.id !== user.id){
      throw new ForbiddenException("Cette icône ne vous appartient pas")
    }
    
    return {
      message: "Modification de l'icône",
      data: await this.iconsService.update(+id, updateIconDto)
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iconsService.remove(+id);
  }
}
