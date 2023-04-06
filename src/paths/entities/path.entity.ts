import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Viewbox } from "src/viewboxes/entities/viewbox.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PathStatus } from "../Types/PathStatus";


/**
 * Un path SVG
 * 
 * @version v2
 */
@Entity("paths")

export class Path extends BaseEntity {

  /** Identifiant du Path */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id : number ;

  /** Nom du Path */
  @ApiProperty()
  @Column()
  name : string ;

  /** Status du Path "public" ou "private" */
  @ApiProperty()
  @Column({ type : "enum" , enum : PathStatus , default : PathStatus.PRIVATE})
  status : PathStatus ;

  /** Chemin du Path */
  @ApiProperty()
  @Column()
  d : string ;


  /** Cadre du Path */
  @ApiProperty()
  @ManyToOne(()=> Viewbox, (viewbox)=> viewbox.paths,{eager : true})
  viewbox : Viewbox ;

  /** l'Auteur du path */
  @ApiProperty()
  @ManyToOne(()=> User, (user)=> user.paths,{eager : true})
  user : User ;

}
