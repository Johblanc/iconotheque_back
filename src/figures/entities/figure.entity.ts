import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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


}
