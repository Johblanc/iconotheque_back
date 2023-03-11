import { Injectable } from '@nestjs/common';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
import { Path } from './entities/path.entity';


/**
 * Liaison avec la table paths de la BDD
 * 
 * @v1 **create**         : Demande de création d'un path
 * @v1 **findAll**        : Demande de récupération de tous les paths
 * 
 * @version v1
 */
@Injectable()
export class PathsService {

  /**
   * Demande de création d'un path
   * 
   * @param createPathDto Parametres de création d'un path
   * @returns Le nouveau path
   * 
   * @version v1
   */
  async create(createPathDto: CreatePathDto) : Promise<Path>
  {
    return await Path.create({...createPathDto}).save();
  }

  /**
   * Demande de récupération de tous les paths
   * 
   * @returns Liste de tous les paths
   * 
   * @version v1
   */
  async findAll() : Promise<Path[]>
  {
    return await Path.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} path`;
  }

  async update(id: number, updatePathDto: UpdatePathDto) {
    return `This action updates a #${id} path`;
  }

  async remove(id: number) {
    return `This action removes a #${id} path`;
  }
}
