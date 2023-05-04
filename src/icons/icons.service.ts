import { Injectable } from '@nestjs/common';
import { PathStatus } from 'src/paths/Types/PathStatus';
import { User } from 'src/users/entities/user.entity';
import { CreateIconDto } from './dto/create-icon.dto';
import { UpdateIconDto } from './dto/update-icon.dto';
import { Icon } from './entities/icon.entity';
import { Figure } from 'src/figures/entities/figure.entity';
import { Aspect } from 'src/aspects/entities/aspect.entity';
import { Path } from 'src/paths/entities/path.entity';


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
  async create(createIconDto: CreateIconDto, user : User) : Promise<Icon | null> {
    const newIcon = await Icon.create({...createIconDto, user}).save(); 
    await Promise.all([newIcon])
    await Promise.all(createIconDto.figures.map(async fig => await Figure.create({...fig,icon : newIcon}).save() ))
  
    return await Icon.findOneBy({id : newIcon.id})
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
      if ( updateIconDto.name !== undefined ) icon.name = updateIconDto.name ;
      if ( updateIconDto.viewbox !== undefined ) icon.viewbox = updateIconDto.viewbox ;
      if ( updateIconDto.figures !== undefined ) {
        const figures = [...icon.figures].sort((a, b) => a.order - b.order)
        
        await Promise.all([...figures.map(async item => {
          if (item.order > updateIconDto.figures!.length) {
            return await item.remove() ;
          }
          else
          {
            const newItem = updateIconDto.figures?.filter( elm => elm.order === item.order )[0]! ;

            const aspect = await Aspect.findOneBy({id : newItem.aspect.id}) ;
            if (aspect !== null) {
              item.aspect = aspect ;
            } ;

            const path = await Path.findOneBy({id : newItem.path.id}) ;
            if (path !== null) {
              item.path = path ;
            } ;
            await Promise.all([aspect,path])
            return await item.save()

          }
        })])
        if ( figures.length < updateIconDto.figures.length ){
          await Promise.all([
            ...updateIconDto.figures
            .filter(item => item.order > figures.length) 
            .map(async item => {
              const newFigure = await Figure.create({...item, icon }).save() ;
              icon.figures.push(newFigure) ;
              return newFigure
            })
          ])
        }
      }
      await Promise.all([icon.save()])
    }
    return await this.findOneById(id);
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
