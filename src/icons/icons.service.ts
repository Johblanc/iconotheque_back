import { Injectable } from '@nestjs/common';
import { PathStatus } from 'src/paths/Types/PathStatus';
import { User } from 'src/users/entities/user.entity';
import { CreateIconDto } from './dto/create-icon.dto';
import { UpdateIconDto } from './dto/update-icon.dto';
import { Icon } from './entities/icon.entity';


/**
 * Liaison avec la table icons de la BDD
 * 
 * @v2 **create**           : Demande de création d'une Icône
 * @v2 **findAllPublics**   : Demande de récupération de tous les icônes publiques
 * @v2 **findAllPrivates**  : Demande de récupération de tous les icônes privées d'un user
 * @v2 **findOneById**      : Demande de récupération d'une icône avec son id
 * @v2 **update**           : Demande de modification d'une icône
 * @v2 **publish**          : Demande de publication d'une icône
 * @v2 **remove**           : Demande de suppression d'une icône
 * 
 * @version v2
 */
@Injectable()
export class IconsService {

  /**
   * Demande de création d'une icône
   * 
   * @param createPathDto Parametres de création d'une icône
   * @param user l'auteur de l'icône
   * @returns la nouvelle Icône
   * 
   * @version v2
   */
  async create(createIconDto: CreateIconDto, user : User) : Promise<Icon> {
    return await Icon.create({...createIconDto, user}).save();
  }

  /**
   * Demande de récupération de tous les icônes publiques
   * 
   * @returns Liste de tous les icônes publiques
   * 
   * @version v2
   */
  async findAllPublics() : Promise<Icon[]> {
    return await Icon.findBy({status : PathStatus.PUBLIC});
  }

  /**
   * Demande de récupération de tous les icônes privées d'un user
   * 
   * @param user l'auteur des icônes
   * @returns Liste de tous les icônes privées
   * 
   * @version v2
   */
  async findAllPrivates(user : User) : Promise<Icon[]> {
    return await Icon.findBy({status : PathStatus.PRIVATE,user : {id : user.id}});
  }

  /**
   * Demande de récupération d'une icône avec son id
   * 
   * @param id Identifiant de l'icône recherchée
   * @returns L'icône recherchée, si il existe, sinon null
   * 
   * @version v2
   */
  async findOneById(id: number) : Promise<Icon | null>
  {
    return await Icon.findOneBy({id});
  }

  /**
   * Demande de modification d'une icône
   * 
   * @param id Identifiant de l'icône à modifier
   * @param updateIconDto parametre de modification de l'icône
   * @returns L'icône modifié
   * 
   * @version v2
   */
  async update(id: number, updateIconDto: UpdateIconDto) : Promise<Icon | null> {
    const icon = await Icon.findOneBy({id}) ;
    if (icon !== null) {
      if (updateIconDto.name) icon.name = updateIconDto.name ;
      if (updateIconDto.viewbox) icon.viewbox = updateIconDto.viewbox ;
      await icon.save()
    }
    return icon;
  }

  /**
   * Demande de publication d'une icône
   * 
   * @param id Identifiant de l'icône à publier
   * @returns L'icône publiée
   * 
   * @version v2
   */
  async publish(id: number) : Promise<Icon | null>
  {
    const icon = await Icon.findOneBy({id}) ;
    if (icon !== null) {
      icon.status = PathStatus.PUBLIC ;
      await icon.save()
    }
    return icon;
  }

  /**
   * Demande de suppression d'une icône
   * 
   * @param id Identifiant de l'icône à supprimer
   * @returns L'icône supprimé
   * 
   * @version v2
   */
  async remove(id: number) : Promise<Icon | null>
  {
    const icon = await this.findOneById(id) ;
    if (icon)
    {
      await icon.remove()
    }
    return icon;
  }
}
