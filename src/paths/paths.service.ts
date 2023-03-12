import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
import { Path } from './entities/path.entity';
import { PathStatus } from './Types/PathStatus';


/**
 * Liaison avec la table paths de la BDD
 * 
 * @v1 **create**           : Demande de création d'un path
 * @v1 **findAllPublics**   : Demande de récupération de tous les paths publiques
 * @v1 **findAllPrivates**  : Demande de récupération de tous les paths privés d'un user
 * @v1 **findOneById**      : Demande de récupération d'un path avec son id
 * @v1 **findOneByName**    : Demande de récupération d'un path avec son nom
 * @v1 **update**           : Demande de modification d'un path
 * @v1 **publish**          : Demande de modification d'un path
 * @v1 **delete**           : Demande de suppression d'un path
 * 
 * @version v1
 */
@Injectable()
export class PathsService {

  /**
   * Demande de création d'un path
   * 
   * @param createPathDto Parametres de création d'un path
   * @param user l'auteur du path
   * @returns Le nouveau path
   * 
   * @version v1
   */
  async create(createPathDto: CreatePathDto, user : User) : Promise<Path>
  {
    return await Path.create({...createPathDto, user}).save();
  }

  /**
   * Demande de récupération de tous les paths publiques
   * 
   * @returns Liste de tous les paths publiques
   * 
   * @version v1
   */
  async findAllPublics() : Promise<Path[]>
  {
    return await Path.findBy({status : PathStatus.PUBLIC});
  }

  /**
   * Demande de récupération de tous les paths privés d'un user
   * 
   * @returns Liste de tous les paths publiques
   * 
   * @version v1
   */
  async findAllPrivates(user : User) : Promise<Path[]>
  {
    return await Path.findBy({status : PathStatus.PRIVATE,user : {id : user.id}});
  }

  /**
   * Demande de récupération d'un pathavec son id
   * 
   * @param id Identifiant du path recherché
   * @returns Le path recherché, si il existe, sinon null
   * 
   * @version v1
   */
  async findOneById(id: number) : Promise<Path | null>
  {
    return await Path.findOneBy({id});
  }


  /**
   * Demande de récupération d'un path avec son nom
   * 
   * @param name nom du path recherché
   * @returns Le path recherché, si il existe, sinon null
   * 
   * @version v1
   */
  async findOneByName(name: string) : Promise<Path | null>
  {
    return await Path.findOneBy({name});
  }

  /**
   * Demande de modification d'un path
   * 
   * @param id Identifiant du path à modifier
   * @param updatePathDto parametre de modification du path
   * @returns le path modifié
   * 
   * @version v1
   */
  async update(id: number, updatePathDto: UpdatePathDto) : Promise<Path | null>
  {
    const path = await this.findOneById(id) ;
    if (path)
    {
      updatePathDto.name      && (path.name     = updatePathDto.name      ) ;
      updatePathDto.viewbox   && (path.viewbox  = updatePathDto.viewbox   ) ;
      updatePathDto.d         && (path.d        = updatePathDto.d         ) ;
    }
    return path;
  }

  /**
   * Demande de publication d'un path
   * 
   * @param id Identifiant du path à publier
   * @returns le path publié
   * 
   * @version v1
   */
  async publish(id: number) : Promise<Path | null>
  {
    const path = await this.findOneById(id) ;
    if (path)
    {
      path.status = PathStatus.PUBLIC ;
      await path.save()
    }
    return path;
  }

  /**
   * Demande de suppression d'un path
   * 
   * @param id Identifiant du path à supprimer
   * @returns le path supprimé
   * 
   * @version v1
   */
  async remove(id: number) : Promise<Path | null>
  {
    const path = await this.findOneById(id) ;
    if (path)
    {
      await path.remove()
    }
    return path;
  }
}
