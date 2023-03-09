import { Controller, Get, Param, Post, Body, UseGuards, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateReactionDto } from '../dtos/create-reaction.dto';
import { ReactionService } from '../services/reaction.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthHelper } from '../../../helpter/auth-helper';

@Controller('reaction')
@ApiTags('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @ApiOperation({
    summary: `Get reaction information`,
  })
  @ApiOkResponse({
    description: 'Reaction information',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({
    description: `Forbidden. Cannot get reaction information`,
  })
  @ApiParam({
    type: String,
    name: 'id',
  })
  @Get('/:id')
  get(@Param('id') id: string) {
    return this.reactionService.findOne(id);
  }

  @ApiOperation({ summary: 'Create new reaction' })
  @ApiCreatedResponse({
    description: 'Create a reaction successful',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({
    description: `Forbidden. Cannot create new reaction`,
  })
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Request() req, @Body() dto: CreateReactionDto) {
    const authorEmail = AuthHelper.getEmailFromToken(req.headers.authorization);

    return this.reactionService.react(authorEmail, dto);
  }
  //
  // @ApiOperation({ summary: 'Update a event' })
  // @ApiCreatedResponse({
  //   description: 'Update a event',
  // })
  // @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  // @ApiForbiddenResponse({
  //   description: `Forbidden. Cannot update a event`,
  // })
  // @Put('/:id')
  // async update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
  //   return this.eventService.update(id, dto);
  // }
  //
  // @ApiOperation({ summary: 'Delete a event' })
  // @ApiCreatedResponse({
  //   description: 'Delete a event',
  // })
  // @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  // @ApiForbiddenResponse({
  //   description: `Forbidden. Cannot delete a event`,
  // })
  // @Delete('/:id')
  // async delete(@Param('id') id: string) {
  //   return this.eventService.delete(id);
  // }
}
