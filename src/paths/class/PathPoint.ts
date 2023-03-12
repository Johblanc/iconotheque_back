import { Format } from './Format';

/**
 * Objet Representant un point dans un path
 *
 * @version v1
 * */
export class PathPoint {
  
  /**
   * Permet la découpe d'un tracé de path.
   *
   * @param path le tracé à découper
   * @returns une liste contenant chaque moceau du tracé (type ou paramètre de point)
   *
   * @example "M-.1.2-.3 1" => [ "M", "-0.1", "0.2", "-0.3", "1" ]
   *
   * @version v1
   */
  static pathSpliter(path: string): string[] {
    let lastSeparator = ' ';
    return path
      .split('')
      .map((item) => {
        if (Format.convert(item)) {
          lastSeparator = ' ';
          return ` ${item} `;
        }
        if (item === '-') {
          lastSeparator = ' ';
          return ` ${item}`;
        }
        if (item === '.' && lastSeparator === '.') {
          return ` 0${item}`;
        }
        if (item === ',' || item === ' ' || item === '\n' || item === '.') {
          lastSeparator = item;
        }
        return item;
      })
      .join('')
      .trim()
      .split(/,| |\n/)
      .filter((item) => item !== '');
  }
}
