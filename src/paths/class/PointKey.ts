import { TFormat } from '../types/TFormat';
import { TPointKey } from '../types/TPointKey';

/**
 * Objet representant un format de point
 *
 * @version v1
 */
export class PointKey {
  /**
   * Liste de propriétés d'un format de point
   *
   * @param format le format cible
   * @returns la liste des propriétés
   *
   * @version v1
   */
  static formatKeys(format: TFormat): TPointKey[] {
    if (format === 'm') return ['dx', 'dy'];
    if (format === 'l') return ['dx', 'dy'];
    if (format === 'h') return ['dx'];
    if (format === 'v') return ['dy'];
    if (format === 'c') return ['dx1', 'dy1', 'dx2', 'dy2', 'dx', 'dy'];
    if (format === 's') return ['dx2', 'dy2', 'dx', 'dy'];
    if (format === 'q') return ['dx1', 'dy1', 'dx', 'dy'];
    if (format === 't') return ['dx', 'dy'];
    if (format === 'a') return ['rx', 'ry', 'angle', 'largeArcFlag', 'sweepFlag', 'dx', 'dy'];

    if (format === 'M') return ['x', 'y'];
    if (format === 'L') return ['x', 'y'];
    if (format === 'H') return ['x'];
    if (format === 'V') return ['y'];
    if (format === 'C') return ['x1', 'y1', 'x2', 'y2', 'x', 'y'];
    if (format === 'S') return ['x2', 'y2', 'x', 'y'];
    if (format === 'Q') return ['x1', 'y1', 'x', 'y'];
    if (format === 'T') return ['x', 'y'];
    if (format === 'A') return ['rx', 'ry', 'angle', 'largeArcFlag', 'sweepFlag', 'x', 'y'];
    return [];
  }
}
