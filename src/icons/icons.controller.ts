import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IconsService } from './icons.service';
import { CreateIconDto } from './dto/create-icon.dto';
import { UpdateIconDto } from './dto/update-icon.dto';
import { Bind, UseGuards } from '@nestjs/common/decorators';
import { UserAuthGuard } from 'src/auth/user_guard/user-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common/exceptions';
import { FiguresService } from 'src/figures/figures.service';
import { CreateFigureDto } from 'src/figures/dto/create-figure.dto';
import { PathsService } from 'src/paths/paths.service';
import { AspectsService } from 'src/aspects/aspects.service';
import { UpdateFigureDto } from 'src/figures/dto/update-figure.dto';
import { Path } from 'src/paths/entities/path.entity';
import { Aspect } from 'src/aspects/entities/aspect.entity';

/**
 * Routage et contrôle des requete pour la table icons
 *
 * @v2 **create**           : Demande de création d'une Icône
 * @v2 **findAllPublics**   : Demande de récupération des icônes publiques
 * @v2 **findAllPrivates**  : Demande de récupération de tous les icônes privées d'un user
 * @v2 **update**           : Demande de modification d'une icône
 * @v2 **publish**          : Demande de publication d'une icône
 * @v2 **remove**           : Demande de suppression d'une icône
 * @v2 **addFigure**        : Demande d'ajout d'une figure dans une icône
 * @v2 **updateFigure**     : Demande de modification d'une figure dans une icône
 * @v2 **removeFigure**     : Demande de suppression d'une figure dans une icône
 *
 * @version v2
 */
@Controller('icons')
export class IconsController {
  constructor(
    private readonly iconsService: IconsService,
    private readonly pathsService: PathsService,
    private readonly aspectsService: AspectsService,
    private readonly figuresService: FiguresService
    ) {}

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

  /**
   * Demande de publication d'une icône
   * 
   * @param id identifiant de l'icône à publier
   * @param user Demandeur
   * @returns L'icône publiée
   * 
   * @version v2
   */
  @UseGuards(UserAuthGuard)
  @Patch('publish/:id')
  @Bind(Param('id', ParseIntPipe))
  async publish(@Param('id') id: string, @GetUser() user: User) {

    const icon = await this.iconsService.findOneById(+id)

    if (icon === null){
      throw new NotFoundException("Cette icône n'existe pas")
    }
    if (icon.user.id !== user.id){
      throw new ForbiddenException("Cette icône ne vous appartient pas")
    }

    return {
      message: "Publication du l'Icône",
      data: await this.iconsService.publish(+id)
    };
  }

  /**
   * Demande de suppression d'une icône
   * 
   * @param id identifiant de l'icône à supprimer
   * @param user Demandeur
   * @returns L'icône supprimée
   * 
   * @version v2
   */
  @UseGuards(UserAuthGuard)
  @Delete(':id')
  @Bind(Param('id', ParseIntPipe))
  async remove(@Param('id') id: string, @GetUser() user: User) {

    const path = await this.iconsService.findOneById(+id)

    if (path === null){
      throw new NotFoundException("Cette icône n'existe pas")
    }
    if (path.user.id !== user.id && user.access === 1){
      throw new ForbiddenException("Cette icône ne vous appartient pas")
    }
    await this.iconsService.remove(+id)
    return {
      message: "Suppression de l'icône",
      data: path
    };
  }
  

  /**
   * Demande d'ajout d'une figure dans une icône
   *
   * @param iconId Identifiant de l'icône
   * @param createFormDto paramètres de création d'une Icône
   * @param user l'auteur
   * 
   * @returns l'icône modifiée
   *
   * @version v2
   */
  @UseGuards(UserAuthGuard)
  @Post(':iconId/figures')
  @Bind(Param('iconId', ParseIntPipe))
  async addFigure(@Param('iconId') iconId: string,@Body() createFormDto: CreateFigureDto, @GetUser() user: User) {

    const icon = await this.iconsService.findOneById(+iconId) ;
    const path = await this.pathsService.findOneById(createFormDto.pathId) ;
    const aspect = await this.aspectsService.findOne(createFormDto.aspectId) ;
    let order = createFormDto.order

    if (icon === null) {
      throw new NotFoundException("Cette icône n'existe pas") ;
    } ;
    if (icon.user.id !== user.id) {
      throw new ForbiddenException("Vous n'avez pas accès à cette icône") ;
    } ;

    if (path === null) {
      throw new NotFoundException("Ce path n'existe pas") ;
    } ;
    if (path.user.id !== user.id) {
      throw new ForbiddenException("Vous n'avez pas accès à ce path") ;
    } ;

    if (aspect === null) {
      throw new NotFoundException("Cet aspect n'existe pas") ;
    } ;
    if (aspect.user.id !== user.id) {
      throw new ForbiddenException("Vous n'avez pas accès à cet aspect") ;
    } ;

    if (order){
      if (order > icon.figures.length + 1){
        throw new BadRequestException("la valeur de l'ordre est trop élevée") ;
      }
    }
    else {
      order = icon.figures.length + 1 ;
    } ;

    const figure = await this.figuresService.create(icon, path, aspect, order)

    await Promise.all([figure])

    return {
      message: "Création d'une nouvelle Figure",
      data: await this.iconsService.findOneById(+iconId)
    } ;
  }

  /**
   * Demande de modification d'une figure dans une icône
   * 
   * @param iconId Identifiant de l'icône dans laquelle se trouve la figure
   * @param figureOrder Position de la figure dans l'icône
   * @param updateFigureDto Parametres de modification de la figure
   * @param user l'auteur
   * 
   * @returns l'icône modifiée
   *
   * @version v2
   */
  @UseGuards(UserAuthGuard)
  @Patch(':iconId/figures/:figureOrder')
  @Bind(Param('iconId', ParseIntPipe))
  @Bind(Param('figureOrder', ParseIntPipe))
  async updateFigure(@Param('iconId') iconId: string,@Param('figureOrder') figureOrder: string, @Body() updateFigureDto: UpdateFigureDto, @GetUser() user: User) {

    const icon = await this.iconsService.findOneById(+iconId) ;

    if (icon === null) {
      throw new NotFoundException("Cette icône n'existe pas") ;
    } ;
    if (icon.user.id !== user.id) {
      throw new ForbiddenException("Vous n'avez pas accès à cette icône") ;
    } ;
    
    if (+figureOrder > icon.figures.length){
      throw new BadRequestException("la valeur de l'ordre est trop élevée") ;
    } ;
    
    if (+figureOrder < 1){
      throw new BadRequestException("la valeur de l'ordre est trop basse") ;
    } ;

    let path : Path | null = null ;
    if (updateFigureDto.pathId){
      path = await this.pathsService.findOneById(updateFigureDto.pathId) ;
      if (path === null) {
        throw new NotFoundException("Ce path n'existe pas") ;
      } ;
      if (path.user.id !== user.id) {
        throw new ForbiddenException("Vous n'avez pas accès à ce path") ;
      } ;
    } ;
    
    let aspect : Aspect | null = null ;
    if (updateFigureDto.aspectId) {
      aspect = await this.aspectsService.findOne(updateFigureDto.aspectId) ;
      if (aspect === null) {
        throw new NotFoundException("Cet aspect n'existe pas") ;
      } ;
      if (aspect.user.id !== user.id) {
        throw new ForbiddenException("Vous n'avez pas accès à cet aspect") ;
      } ;
    } ;

    let order = updateFigureDto.order
    
    if (order){
      if (order > icon.figures.length + 1){
        throw new BadRequestException("la valeur de l'ordre est trop élevée") ;
      } ;
    } ;

    const figure = await this.figuresService.update(icon, +figureOrder, path, aspect, order)

    await Promise.all([figure])

    return {
      message: "Modification d'une Figure",
      data: await this.iconsService.findOneById(+iconId)
    } ;
  }


  /**
   * Demande de suppression d'une figure dans une icône
   * 
   * @param iconId Identifiant de l'icône dans laquelle se trouve la figure
   * @param figureOrder Position de la figure dans l'icône
   * @param user l'auteur
   * 
   * @returns l'icône modifiée
   *
   * @version v2
   */
  @UseGuards(UserAuthGuard)
  @Delete(':iconId/figures/:figureOrder')
  @Bind(Param('iconId', ParseIntPipe))
  @Bind(Param('figureOrder', ParseIntPipe))
  async removeFigure(@Param('iconId') iconId: string,@Param('figureOrder') figureOrder: string, @GetUser() user: User) {

    const icon = await this.iconsService.findOneById(+iconId) ;

    if (icon === null) {
      throw new NotFoundException("Cette icône n'existe pas") ;
    } ;
    if (icon.user.id !== user.id) {
      throw new ForbiddenException("Vous n'avez pas accès à cette icône") ;
    } ;
    
    if (+figureOrder > icon.figures.length){
      throw new BadRequestException("la valeur de l'ordre est trop élevée") ;
    } ;
    
    if (+figureOrder < 1){
      throw new BadRequestException("la valeur de l'ordre est trop basse") ;
    } ;

    const figure = await this.figuresService.remove(icon, +figureOrder)

    await Promise.all([figure])

    return {
      message: "Suppression d'une Figure",
      data: await this.iconsService.findOneById(+iconId)
    } ;
  }

}
