import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';


/**
 * Validator pour la ViewBox
 * 
 * @version v1
 */
@ValidatorConstraint({ name: 'IsOrdered', async: false })
export class IsOrdered implements ValidatorConstraintInterface {

  validate(objects: {order : number}[], args: ValidationArguments) {
    
    for (let i = 1 ; i <= objects.length ; i += 1 ){
      if (objects.filter(item => item.order === i).length !== 1) {
        return false ;
      }
    }
    return true
  }

  defaultMessage(args: ValidationArguments) {
    return "Les valeurs des ordres doivent être uniques et continues de un en un";
  }
}
