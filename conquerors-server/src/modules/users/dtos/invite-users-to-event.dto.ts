import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class InviteUsersToEventDto {
  @ApiProperty({
    description: 'Invited users',
    example: '[]',
    type: String,
  })
  @IsNotEmpty()
  @IsArray()
  userIds: string[];

  @ApiProperty({
    description: 'Event Id',
    example: 'id',
    type: String,
  })
  @IsNotEmpty()
  @IsArray()
  @IsUUID()
  eventId: string;
}
