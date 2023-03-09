import { ReactionStatusEnum } from '../common/enums/reaction-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateReactionDto {
  @ApiProperty({
    description: 'Like or Dislike',
    example: 'like',
    enum: ReactionStatusEnum,
  })
  @IsNotEmpty()
  status: ReactionStatusEnum;

  @ApiProperty({
    description: 'Post ID',
    example: 'id',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  postId: string;
}
