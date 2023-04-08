import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateAspectDto } from './dto/create-aspect.dto';
import { UpdateAspectDto } from './dto/update-aspect.dto';
import { Aspect } from './entities/aspect.entity';


/**
 * Liaison avec la table paths de la BDD
 * 
 * @v2 **create**           : Demande de création d'un path
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

  findAll() {
    return `This action returns all aspects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aspect`;
  }

  update(id: number, updateAspectDto: UpdateAspectDto) {
    return `This action updates a #${id} aspect`;
  }

  remove(id: number) {
    return `This action removes a #${id} aspect`;
  }
}
