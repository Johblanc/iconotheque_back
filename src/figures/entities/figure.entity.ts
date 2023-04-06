import { ApiProperty } from "@nestjs/swagger";
import { Icon } from "src/icons/entities/icon.entity";
import { Path } from "src/paths/entities/path.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 * Une Figure pour une Icone SVG
 * 
 * @version v2
 */
@Entity("figures")
export class Figure extends BaseEntity {

  /** Identifiant de la Figure */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id : number ;

  /** Position de la Figure dans l'icone */
  @ApiProperty()
  @Column({type : "int"})
  order : number ;

  /** Icône de la Figure */
  @ApiProperty()
  @ManyToOne(()=> Icon, (icon)=> icon.figures)
  icon : Icon ;

  /** Path de la Figure */
  @ApiProperty()
  @ManyToOne(()=> Path, (path)=> path.figures,{eager : true})
  path : Path ;

}
