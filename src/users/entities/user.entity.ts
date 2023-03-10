import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


/**
 * Utilisateur de l'Api
 * 
 * @version v1
 */
@Entity("users")
export class User extends BaseEntity {

  /** Identifiant de l'Utilisateur */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id : number ;

  /** Nom de l'Utilisateur */
  @ApiProperty()
  @Column({type : "varying character", unique : true})
  name : string ;

  /** Mail de l'Utilisateur */
  @ApiProperty()
  @Column({type : "varying character", unique : true})
  mail : string ;

}
