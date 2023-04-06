import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Une ViewBox de SVG
 * 
 * @version v2
 */
@Entity("viewboxes")
export class Viewbox extends BaseEntity {

  /** Identifiant de la ViewBox */
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id :number ;

  /** Valeur de la ViewBox */
  @ApiProperty()
  @Column({unique : true})
  value : string ;

  /** Format de donnée de la ViewBox */
  asData()
  {
    const coords = this.value.split(" ")

    return {
      id : this.id,
      value : this.value,
      x : coords[0],
      y : coords[1],
      width : coords[2],
      height : coords[3],
    }
  }
}
