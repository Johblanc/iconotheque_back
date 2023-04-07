import { ApiProperty } from "@nestjs/swagger";
import { Figure } from "src/figures/entities/figure.entity";
import { PathStatus } from "src/paths/Types/PathStatus";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * Un Dessin SVG
 * 
 * @version v2
 */
@Entity("icons")
export class Icon extends BaseEntity {

  /** Identifiant de l'Icône */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id : number ;

  /** Nom de l'Icône */
  @ApiProperty()
  @Column()
  name : string ;

  /** Status de l'Icône "public" ou "private" */
  @ApiProperty()
  @Column({ type : "enum" , enum : PathStatus , default : PathStatus.PRIVATE})
  status : PathStatus ;

  /** Cadre de l'Icône */
  @ApiProperty()
  @Column()
  viewbox : string ;

  /** Les Figures liées à cette Icône */
  @ApiProperty()
  @OneToMany(()=> Figure, (figure)=> figure.icon,{eager : true})
  figures : Figure[] ;
  
  /** l'Auteur de l'Icône */
  @ApiProperty()
  @ManyToOne(()=> User, (user)=> user.icons,{eager : true})
  user : User ;
  
}
