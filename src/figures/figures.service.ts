import { Injectable } from '@nestjs/common';
import { Aspect } from 'src/aspects/entities/aspect.entity';
import { Icon } from 'src/icons/entities/icon.entity';
import { Path } from 'src/paths/entities/path.entity';
import { UpdateFigureDto } from './dto/update-figure.dto';
import { Figure } from './entities/figure.entity';

/**
 * Liaison avec la table figures de la BDD
 * 
 * @v2 **create** : Demande d'ajout d'une figure à une icône
 * @v2 **update** : Demande de modification d'une figure dans une icône
 * 
 * @version v2
 */
@Injectable()
export class FiguresService {

  /**
   * Demande d'ajout d'une figure à une icône
   * 
   * @param icon icône à laquelle on souhaite ajouter la figure
   * @param path Path de la figure
   * @param aspect Aspect de la figure
   * @param order Position de la figure dans l'icône
   * 
   * @returns La nouvelle figure
   * 
   * @version v2
   */
  async create(icon : Icon, path: Path, aspect : Aspect, order : number) : Promise<Figure> {
    
    if (order !== icon.figures.length + 1){
      await Promise.all([...icon.figures.map(
        async figure => {
          if (figure.order >= order){
            figure.order += 1 
            return await figure.save()
          }
          return figure
        }
      )])
    }
    return await Figure.create({icon, path, aspect, order}).save() ;
  }

  /**
   * Demande de modification d'une figure dans une icône
   * 
   * @param icon icône dans laquelle on souhaite modifier la figure
   * @param order Position actuelle de la figure dans l'icône
   * @param path Nouveau path de la figure
   * @param aspect Nouvel aspect de la figure
   * @param newOrder Nouvelle Position de la figure dans l'icône
   * 
   * @returns La figure modifiée
   * 
   * @version v2
   */
  async update(icon : Icon, order : number, path: Path | null, aspect : Aspect | null, newOrder? : number) : Promise<Figure | null> {
    const figure = await Figure.findOneBy({icon : { id : icon.id }, order}) ;

    if (figure !== null) {
      if (path !== null) figure.path = path ;
      if (aspect !== null) figure.aspect = aspect ;
      if (newOrder && newOrder !== order){
        const switchFigure = await Figure.findOneBy({icon : { id : icon.id }, order : newOrder}) ;
        if (switchFigure !== null) {
          switchFigure.order = order
          await Promise.all([await switchFigure.save()])
        }
        figure.order = newOrder ;
      }
      await figure.save()
    }

    return figure ;
  }

  remove(id: number) {
    return `This action removes a #${id} figure`;
  }
}
