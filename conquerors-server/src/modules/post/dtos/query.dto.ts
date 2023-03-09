import { ApiProperty } from '@nestjs/swagger';
import {PostLocationDto} from "./post-location.dto";
import {IsOptional} from "class-validator";

export class QueryDto {
  @ApiProperty({type: PostLocationDto})
  @IsOptional()
  filter: PostLocationDto;
}
