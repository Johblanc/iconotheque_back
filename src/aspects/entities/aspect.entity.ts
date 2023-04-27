import { ApiProperty } from "@nestjs/swagger";
import { Figure } from "src/figures/entities/figure.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
  @Column({type : "float"})
  fill_opacity : number ;

  /** Couleur de bordure */
  @ApiProperty()
  @Column()
  stroke_color : string ;

  /** Opacité de bordure */
  @ApiProperty()
  @Column({type : "float"})
  stroke_opacity : number ;

  /** Epaiseur de bordure */
  @ApiProperty()
  @Column({type : "float"})
  stroke_width : number ;

  /** Les Figures utilisants cet Aspect */
  @ApiProperty()
  @OneToMany(()=> Figure, (figure)=> figure.aspect)
  figures : Figure[] ;

  /** L'auteur de cet Aspect */
  @ApiProperty()
  @ManyToOne(()=> User, (user)=> user.aspects)
  user : User ;

}
