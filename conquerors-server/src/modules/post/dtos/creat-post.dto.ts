import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'post title',
    type: String,
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'post content',
    type: String,
  })
  @IsNotEmpty()
  readonly content: string;
}
