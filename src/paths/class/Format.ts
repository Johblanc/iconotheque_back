import { TFormat, TFormatRel, TFormatAbs } from '../types/TFormat';
import { PointKey } from './PointKey';

/**
 * Objet representant un Format de point d'un path svg.
 * Les methodes static permetent le contrôle des Types lié.
 */
export class Format {

  /**
   * Ensembles des Formats relatifs
   * 
   * @returns ["m" , "l" , "h" , "v" , "c" , "s" , "q" , "t" , "a" , "z" ]
   * 
   * @version v1
   */
  static relFormats(): TFormatRel[] {
    return ['m', 'l', 'h', 'v', 'c', 's', 'q', 't', 'a', 'z'];
  }

  /**
   * Ensembles des Formats absolues
   * 
   * @returns ["M" , "L" , "H" , "V" , "C" , "S" , "Q" , "T" , "A" , "Z" ]
   * 
   * @version v1
   */
  static absFormats(): TFormatAbs[] {
    return ['M', 'L', 'H', 'V', 'C', 'S', 'Q', 'T', 'A', 'Z'];
  }

  /**
   * Ensembles des Formats
   * 
   * @returns ["m" , "l" , "h" , "v" , "c" , "s" , "q" , "t" , "a" , "z" , "M" , "L" , "H" , "V" , "C" , "S" , "Q" , "T" , "A" , "Z" ]
   * 
   * @version v1
   */
  static formats(): TFormat[] {
    return [...Format.relFormats(), ...Format.absFormats()];
  }

  /**
   * Convertion d'un string en TFormat
   * 
   * @param txt   Le string à convertir
   * @returns     la convertion si possible, sinon undifined
   * 
   * @version v1
   */
  static convert(txt?: string | TFormat): TFormat | undefined {
    let result: TFormat | undefined;
    Format.formats()
      .filter((item) => item === txt)
      .forEach((item) => (result = item));

    return result;
  }

  /**
   * Permet de determiner si le point est en coordonnées absolues.
   *
   * @param item  le texte à vérifier.
   * @return      item est-il une de ces lettre :
   * - M , L , H , V , C , S , Q , T , A , Z
   * 
   * @version v1
   * */
  static isAbs(item: string): boolean {
    return ['M', 'L', 'H', 'V', 'C', 'S', 'Q', 'T', 'A', 'Z'].includes(item);
  }

  /**
   * Permet de determiner si le point est en coordonnées relatives.
   *
   * @param item      le texte à vérifier.
   * @return          item est-il une de ces lettre :
   * - m , l , h , v , c , s , q , t , a , z
   * 
   * @version v1
   * */
  static isRel(item: string): boolean {
    return ['m', 'l', 'h', 'v', 'c', 's', 'q', 't', 'a', 'z'].includes(item);
  }

  /**
   * Permet de determiner si le point est un format.
   *
   * @param item  le texte à vérifier.
   * @return      item est-il une de ces lettre :
   * - m , l , h , v , c , s , q , t , a , z , M , L , H , V , C , S , Q , T , A , Z
   * 
   * @version v1
   * */
  static isFormat(item: string): boolean {
    return Format.isAbs(item) || Format.isRel(item);
  }


  /**
   * Permet de determiner le nombre de coordonnées d'un point en fonction de son format.
   *
   * @param format    le format dont on cherche le nombre de coordonnées.
   * @returns         le nombre de coordonnées du format :
   *
   * - m, M : 2 : Move To
   * - l, L : 2 : Line To
   * - h, H : 1 : Horizontal Line To
   * - v, V : 1 : Vertical Line To
   * - c, C : 6 : Cubic Bézier Curve
   * - s, S : 4 : Smooth Cubic Bézier Curve
   * - q, Q : 4 : Quadratic Bézier Curve
   * - t, T : 2 : Smooth Quadratic Bézier Curve
   * - a, A : 7 : Elliptical Arc Curve
   * - z, Z : 0 : Close Path
   * 
   * @version v1
   * */
  static keysLength(format: string): number {
    return PointKey.formatKeys(Format.convert(format) || 'z').length;
  }
}
