import { ApiProperty } from "@nestjs/swagger";
import { Path } from "src/paths/entities/path.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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


  /** Paths liés à cette ViewBox */
  @ApiProperty()
  @OneToMany(()=> Path, (path)=> path.viewbox)
  paths : Path[] ;

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
