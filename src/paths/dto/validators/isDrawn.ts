import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { SvgPath } from 'src/paths/class/Svg_Path';

/**
 * Validator pour le tracé
 * 
 * @version v1
 */
@ValidatorConstraint({ name: 'IsDrawn', async: false })
export class IsDrawn implements ValidatorConstraintInterface {

  message : string ;

  constructor(){
    this.message = ""
  }


  validate(text: string, args: ValidationArguments) {
    this.message = SvgPath.findErrors(text)
    return this.message === "" ;
  }

  defaultMessage(args: ValidationArguments) {
    return this.message ;
  }
}
