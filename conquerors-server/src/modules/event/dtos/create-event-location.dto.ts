import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventLocationDto {
  @ApiProperty({
    type: String,
  })
  @IsOptional()
  readonly street?: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  readonly ward?: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  readonly district?: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  readonly province?: string;
}
