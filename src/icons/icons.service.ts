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

  findOne(id: number) {
    return `This action returns a #${id} icon`;
  }

  update(id: number, updateIconDto: UpdateIconDto) {
    return `This action updates a #${id} icon`;
  }

  remove(id: number) {
    return `This action removes a #${id} icon`;
  }
}
