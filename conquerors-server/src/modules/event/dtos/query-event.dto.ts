import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateEventLocationDto } from './create-event-location.dto';

export class QueryEventDto {
  @ApiProperty({ type: CreateEventLocationDto })
  @IsOptional()
  filter: CreateEventLocationDto;
}
