import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({
    description: 'Event title',
    example: 'Event title 1',
    type: String,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Event address',
    example: 'Event address 1',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Start date',
    example: '2022-10-24T03',
    type: String,
  })
  @IsISO8601(null, {
    message: 'Start date must be date',
  })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'End date',
    example: '2022-10-24T03',
    type: String,
  })
  @IsISO8601(null, {
    message: 'End date must be date',
  })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    description: 'Event avatar',
  })
  @IsOptional()
  avatar: any;
}
