import { PartialType } from '@nestjs/swagger';
import { CreatePathDto } from './create-path.dto';

/**
 * Contrôle des paramètres de modification d'un path
 * 
 * @version v1
 */
export class UpdatePathDto extends PartialType(CreatePathDto) {}
