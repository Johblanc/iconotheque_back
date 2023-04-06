import { ApiProperty } from "@nestjs/swagger";
import { PathStatus } from "src/paths/Types/PathStatus";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
  
  /** l'Auteur de l'Icône */
  @ApiProperty()
  @ManyToOne(()=> User, (user)=> user.icons,{eager : true})
  user : User ;
  
}
