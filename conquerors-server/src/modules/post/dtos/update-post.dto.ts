import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    type: String,
  })
  @IsOptional()
  readonly content: string;

  @ApiProperty()
  @IsOptional()
  readonly images: any[];
}
