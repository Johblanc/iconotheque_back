import { ApiProperty } from "@nestjs/swagger";
import { Path } from "src/paths/entities/path.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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
  @Column({type : "varchar", unique : true})
  name : string ;

  /** Mail de l'Utilisateur */
  @ApiProperty()
  @Column({type : "varchar", unique : true})
  mail : string ;

  /** Le mot de passe de l'Utilisateur */
  @ApiProperty()
  @Column({type : "varchar"})
  password : string ;

  /** Liste des paths de l'utilisateur */
  @ApiProperty()
  @OneToMany(()=> Path, (path)=> path.user)
  paths : Path[]
}
