import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';


/**
 * Validator pour la ViewBox
 * 
 * @version v1
 */
@ValidatorConstraint({ name: 'IsViewbox', async: false })
export class IsViewbox implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    const coords = text.split(" ") ;
    if (coords.length !== 4 )
    {
      return false ;
    }
    let allNumbers = true ;
    coords.map(item => allNumbers = allNumbers && !Number.isNaN(Number(item))) ;
    return allNumbers ;
  }

  defaultMessage(args: ValidationArguments) {
    return "La viewbow doit être un string contenant 4 numbers `${x0} ${y0} ${width} ${height}`";
  }
}
