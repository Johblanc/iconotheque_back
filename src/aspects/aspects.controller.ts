import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Bind, ParseIntPipe } from '@nestjs/common';
import { ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
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
      message: "Récupération de tous les Aspects",
      data: await this.aspectsService.findAll()
    };
  }


  /**
   * Demande de récupération d'un Aspect
   * 
   * @param id l'identifiant de l'aspect recherché
   * @returns L'aspect recherché
   *
   * @version v2
   */
  @Get(':id')
  @Bind(Param('id', ParseIntPipe))
  async findOne(@Param('id') id: string) {

    const aspect = await this.aspectsService.findOne(+id)

    if (aspect === null ){
      throw new NotFoundException("Cet aspect n'existe pas")
    }

    return {
      message: "Récupération d'un Aspect",
      data: aspect
    };
  }

  /**
   * Demande de modification d'un Aspect
   * 
   * @param updateAspectDto paramètres de création d'un aspect
   * @param id l'identifiant de l'aspect recherché
   * @param user l'auteur
   * @returns L'aspect modifié
   *
   * @version v2
   */
  @UseGuards(UserAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAspectDto: UpdateAspectDto, @GetUser() user: User) {
    
    const aspect = await this.aspectsService.findOne(+id)

    if (aspect === null ){
      throw new NotFoundException("Cet aspect n'existe pas")
    }

    if (user.id !== aspect.user.id ){
      throw new ForbiddenException("Vous n'êtes pas autorisé à modifier cette aspect")
    }

    return {
      message: "Modification d'un Aspect",
      data: await this.aspectsService.update(+id, updateAspectDto)
    } ;
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aspectsService.remove(+id);
  }
}
