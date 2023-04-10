import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IconsService } from './icons.service';
import { CreateIconDto } from './dto/create-icon.dto';
import { UpdateIconDto } from './dto/update-icon.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { UserAuthGuard } from 'src/auth/user_guard/user-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

/**
 * Routage et contrôle des requete pour la table icons
 *
 * @v2 **create**           : Demande de création d'une Icône
 * @v2 **findAllPublics**   : Demande de récupération des icônes publiques
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iconsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIconDto: UpdateIconDto) {
    return this.iconsService.update(+id, updateIconDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iconsService.remove(+id);
  }
}
