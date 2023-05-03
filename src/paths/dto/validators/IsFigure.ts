import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';


/**
 * Validator pour la ViewBox
 * 
 * @version v1
 */
@ValidatorConstraint({ name: 'IsFigure', async: false })
export class IsFigure implements ValidatorConstraintInterface {

  validate(obj: any, args: ValidationArguments) {
    if (obj.order === undefined ) return false ;
    if (typeof obj.order !== "number" ) return false ;
    if (obj.path === undefined ) return false ;
    if (obj.path.id === undefined ) return false ;
    if (typeof obj.path.id !== "number" ) return false ;
    if (obj.aspect === undefined ) return false ;
    if (obj.aspect.id === undefined ) return false ;
    if (typeof obj.aspect.id !== "number" ) return false ;

    return true
  }

  defaultMessage(args: ValidationArguments) {
    return "Chaque figure doit être au format { order : number, path : { id : number }, aspect : { id : number }}";
  }
}
