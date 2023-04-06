import { ApiProperty } from "@nestjs/swagger";
import { PathStatus } from "src/paths/Types/PathStatus";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Un Dessin SVG
 * 
 * @version v2
 */
@Entity("icons")
export class Icon extends BaseEntity {

  /** Identifiant de l'Icone */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id : number ;

  /** Nom de l'Icone */
  @ApiProperty()
  @Column()
  name : string ;

  /** Status de l'Icone "public" ou "private" */
  @ApiProperty()
  @Column({ type : "enum" , enum : PathStatus , default : PathStatus.PRIVATE})
  status : PathStatus ;
  
}
