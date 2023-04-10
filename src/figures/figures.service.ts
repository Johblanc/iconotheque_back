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
   */
  async create(icon : Icon, path: Path, aspect : Aspect, order : number) {
    
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

  findAll() {
    return `This action returns all figures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} figure`;
  }

  update(id: number, updateFigureDto: UpdateFigureDto) {
    return `This action updates a #${id} figure`;
  }

  remove(id: number) {
    return `This action removes a #${id} figure`;
  }
}
