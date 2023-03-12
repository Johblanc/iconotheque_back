import { Format } from './Format';
import { PathPoint } from './PathPoint';

/**
 * Un objet representant un path Svg
 *
 * @version v1
 * */
export class SvgPath {
  
  /**
   * Methode permetant de vérifier le drawn d'un path
   *
   * @version v1
   * */
  static findErrors(path: string): string {
    let result = '';
    let splitPath = PathPoint.pathSpliter(path);

    let curItem: string = '';
    let curValue: string | undefined = '';
    while (splitPath.length > 0) {
      if (Format.isFormat(splitPath[0])) {
        curItem = splitPath.shift()!;
        result += curItem + ' ';
      }
      if (Format.isFormat(curItem)) {
        let targetLength = Format.keysLength(curItem);
        for (let i = 0; i < targetLength; i += 1) {
          curValue = splitPath.shift();
          result += curValue + ' ';

          if (!curValue) {
            return `Vérifié jusqu'à : ${result}\nLe point ${curItem} doit avoir ${targetLength} attribut(s)`;
          } else if (Format.isFormat(curValue)) {
            return `Vérifié jusqu'à : ${result}\n${curItem} ne contient pas le bon nombre de points (${targetLength} attribut(s) / points)`;
          } else if (isNaN(Number(curValue))) {
            return `Vérifié jusqu'à : ${result}\n${curValue} n'est pas un nombre`;
          }
        }
      } else {
        return `Vérifié jusqu'à : ${result}\n${curValue} : Les points doivent commencer par M, m, L, l, H, h, V, v, C, c, S, s, Q, q, T, t, A, a, Z ou z`;
      }
    }
    return '';
  }
}
