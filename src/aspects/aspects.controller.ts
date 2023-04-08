import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserAuthGuard } from 'src/auth/user_guard/user-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { AspectsService } from './aspects.service';
import { CreateAspectDto } from './dto/create-aspect.dto';
import { UpdateAspectDto } from './dto/update-aspect.dto';

/**
 * Routage et contrôle des requete pour la table aspects
 *
 * @v2 **create**  : Demande de création d'un aspect
 * @v2 **findAll** : Demande de récupération des aspects
 * @v2 **findOne** : Demande de récupération d'un aspect
 * @v2 **update**  : Demande de modification d'un path
 * @v2 **remove**  : Demande de suppression d'un path
 *
 * @version v2
 */
@Controller('aspects')
export class AspectsController {
  constructor(private readonly aspectsService: AspectsService) {}

  /**
   * Demande de création d'un aspect
   *
   * @param createAspectDto paramètres de création d'un aspect
   * @param user l'auteur
   * @returns le nouvel aspect
   *
   * @version v2
   */
  @UseGuards(UserAuthGuard)
  @Post()
  async create(@Body() createAspectDto: CreateAspectDto, @GetUser() user: User) {
    return {
      message: "Création d'un nouvel Aspect",
      data: await this.aspectsService.create(createAspectDto, user)
    };
  }

  /**
   * Demande de récupération des Aspects
   * 
   * @returns La liste des Aspects
   *
   * @version v2
   */
  @Get()
  async findAll() {
    return {
      message: "Récupération de tous les Aspect",
      data: await this.aspectsService.findAll()
    };
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAspectDto: UpdateAspectDto) {
    return this.aspectsService.update(+id, updateAspectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aspectsService.remove(+id);
  }
}
