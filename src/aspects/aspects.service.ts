import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateAspectDto } from './dto/create-aspect.dto';
import { UpdateAspectDto } from './dto/update-aspect.dto';
import { Aspect } from './entities/aspect.entity';


/**
 * Liaison avec la table paths de la BDD
 * 
 * @v2 **create**           : Demande de création d'un path
 * @v2 **findAll**          : Demande de récupération des Aspects
 * @v2 **findOne**          : Demande de récupération d'un Aspect
 * @v2 **update**           : Demande de modification d'un Aspect
 * @v2 **remove**           : Demande de suppression d'un Aspect
 * 
 * @version v2
 */
@Injectable()
export class AspectsService {

  /**
   * Demande de création d'un aspect
   * 
   * @param createAspectDto Parametres de création d'un aspect
   * @param user l'auteur du path
   * @returns Le nouvel aspect
   * 
   * @version v2
   */
  async create(createAspectDto: CreateAspectDto, user : User) : Promise<Aspect>
  {
    return await Aspect.create({...createAspectDto, user}).save();
  }

  /**
   * Demande de récupération des Aspects
   * 
   * @returns La liste des Aspects
   * 
   * @version v2
   */
  async findAll() {
    return await Aspect.find({relations : {user : true}});
  }


  /**
   * Demande de récupération d'un Aspect
   * 
   * @param id l'identifiant de l'aspect recherché
   * @returns L'aspect recherché
   * 
   * @version v2
   */
  async findOne(id: number) {
    return await Aspect.findOne({where :{id},relations : {user : true}});
  }

  /**
   * Demande de modification d'un Aspect
   * 
   * @param id l'identifiant de l'aspect à modifier
   * @param updateAspectDto Parametres de modification d'un aspect
   * @returns L'aspect modifié
   */
  async update(id: number, updateAspectDto: UpdateAspectDto) {
    const aspect = await Aspect.findOne({where :{id},relations : {user : true}}) ;
    if (aspect !== null) {
      if (updateAspectDto.name           !== undefined ) aspect.name           = updateAspectDto.name ;
      if (updateAspectDto.fill_color     !== undefined ) aspect.fill_color     = updateAspectDto.fill_color ;
      if (updateAspectDto.fill_opacity   !== undefined ) aspect.fill_opacity   = updateAspectDto.fill_opacity ;
      if (updateAspectDto.stroke_color   !== undefined ) aspect.stroke_color   = updateAspectDto.stroke_color ;
      if (updateAspectDto.stroke_opacity !== undefined ) aspect.stroke_opacity = updateAspectDto.stroke_opacity ;
      if (updateAspectDto.stroke_width   !== undefined ) aspect.stroke_width   = updateAspectDto.stroke_width ;
      await aspect.save()
    }
    return aspect;
  }

  /**
   * Demande de suppression d'un Aspect
   * 
   * @param id l'identifiant de l'aspect à supprimer
   * @returns L'aspect supprimé
   */
  async remove(id: number) {
    const aspect = await Aspect.findOne({where :{id},relations : {user : true}}) ;
    if (aspect !== null) {
      await aspect.remove()
    }
    return aspect;
  }
}
