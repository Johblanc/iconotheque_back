import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";

export class CreateFigureDto {

  @ApiProperty()
  @IsInt()
  pathId : number ;

  @ApiProperty()
  @IsInt()
  aspectId : number ;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @IsOptional()
  order : number ;

}
