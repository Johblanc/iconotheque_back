import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Aspect } from "src/aspects/entities/aspect.entity";
import { Icon } from "src/icons/entities/icon.entity";
import { Path } from "src/paths/entities/path.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


/**
 * Utilisateur de l'Api
 * 
 * @version v2
 */
@Entity("users")
export class User extends BaseEntity {

  /** Identifiant de l'Utilisateur */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id : number ;

  /** Nom de l'Utilisateur */
  @ApiProperty()
  @Column({ unique : true})
  name : string ;

  /** Mail de l'Utilisateur */
  @ApiProperty()
  @Column({ unique : true, select : false})
  mail : string ;

  /** Le mot de passe de l'Utilisateur */
  @Exclude()
  @ApiProperty()
  @Column()
  password : string ;

  /** 
   * Niveau d'acces de l'Utilisateur 
   * * 0 : Visitor
   * * 1 : User
   * * 2 : Admin
   * */
  @ApiProperty()
  @Column({type : "int", default : 1})
  access : number ;

  /** La couleur du theme de l'Utilisateur */
  @ApiProperty()
  @Column()
  theme_color : string ;

  /** Le relief du theme de l'Utilisateur */
  @ApiProperty()
  @Column()
  theme_refief : number ;

  /** Liste des paths de l'utilisateur */
  @ApiProperty()
  @OneToMany(()=> Path, (path)=> path.user)
  paths : Path[] ;

  /** Liste des icônes de l'utilisateur */
  @ApiProperty()
  @OneToMany(()=> Icon, (icon)=> icon.user)
  icons : Icon[] ;

  /** Liste des aspects de l'utilisateur */
  @ApiProperty()
  @OneToMany(()=> Aspect, (aspect)=> aspect.user)
  aspects : Aspect[] ;
}
