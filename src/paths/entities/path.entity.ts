import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PathStatus } from "../Types/PathStatus";


/**
 * Un path SVG
 * 
 * @version v1
 */
@Entity("paths")

export class Path extends BaseEntity {

  /** Identifiant du Path */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id : number ;

  /** Nom du Path */
  @ApiProperty()
  @Column({type : "varying character", unique : true})
  name : string ;

  /** Status du Path "public" ou "private" */
  @ApiProperty()
  @Column({ type : "enum" , enum : PathStatus })
  status : PathStatus ;

  /** Chemin du Path */
  @ApiProperty()
  @Column({type : "varying character"})
  d : string ;


  /** Chemin du Path */
  @ApiProperty()
  @Column({type : "varying character"})
  viewbox : string ;

}
