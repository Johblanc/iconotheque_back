import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Apparence d'une Figure SVG
 * 
 * @version v2
 */
@Entity("aspects")
export class Aspect extends BaseEntity {
  
  /** Identifiant de l'Aspect */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id : number ;

  /** Nom de l'Aspect */
  @ApiProperty()
  @Column()
  name : string ;

  /** Couleur de remplissage */
  @ApiProperty()
  @Column()
  fill_color : string ;

  /** Opacité de remplissage */
  @ApiProperty()
  @Column()
  fill_opacity : number ;

  /** Couleur de bordure */
  @ApiProperty()
  @Column()
  stroke_color : string ;

  /** Opacité de bordure */
  @ApiProperty()
  @Column()
  stroke_opacity : number ;

  /** Epaiseur de bordure */
  @ApiProperty()
  @Column()
  stroke_width : number ;


}
