import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dtos/create-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { AuthHelper } from '../../../helpter/auth-helper';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiMultiFiles } from '../../../decorators/api-files.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from '../../post/controllers/post.controller';
import { CreateEventLocationDto } from '../dtos/create-event-location.dto';
import { QueryEventDto } from '../dtos/query-event.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({
    summary: `Get event information`,
  })
  @ApiOkResponse({
    description: 'Event information',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({
    description: `Forbidden. Cannot get event information`,
  })
  @ApiParam({
    type: String,
    name: 'id',
  })
  @Get('/:id')
  get(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @ApiOperation({
    summary: `Get all event`,
  })
  @ApiOkResponse({
    description: 'All Events information',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({
    description: `Forbidden. Cannot get events information`,
  })
  @ApiQuery({
    name: 'title',
    type: String,
    required: false,
  })
  @Get('')
  search(@Query() title: string) {
    return this.eventService.findAll(title);
  }

  @ApiOperation({ summary: 'Search event location' })
  @Post('/search/location')
  async getPostsByQuery(@Body() query: QueryEventDto): Promise<any> {
    return await this.eventService.getEventByQuery(query);
  }

  @ApiOperation({
    summary: `Get event status`,
  })
  @ApiOkResponse({
    description: 'Event status',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({
    description: `Forbidden. Cannot get event status`,
  })
  @ApiParam({
    type: String,
    name: 'id',
  })
  @Get('/:id/status')
  getStatus(@Param('id') id: string) {
    return this.eventService.getStatus(id);
  }

  @ApiOperation({ summary: 'Create new event' })
  @ApiCreatedResponse({
    description: 'Create a event',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({
    description: `Forbidden. Cannot create new event`,
  })
  @Post('create')
  async create(@Request() req, @Body() dto: CreateEventDto) {
    const authorEmail = AuthHelper.getEmailFromToken(req.headers.authorization);
    return this.eventService.create(authorEmail, dto);
  }

  @ApiOperation({ summary: 'Update a event' })
  @ApiCreatedResponse({
    description: 'Update a event',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({
    description: `Forbidden. Cannot update a event`,
  })
  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a event' })
  @ApiCreatedResponse({
    description: 'Delete a event',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiForbiddenResponse({
    description: `Forbidden. Cannot delete a event`,
  })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.eventService.delete(id);
  }

  @ApiOperation({ summary: 'Upload event avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiMultiFiles()
  @Post('/upload/:eventId')
  @UseInterceptors(FilesInterceptor('files', null, storage))
  async uploadThumbnail(
    @Param('eventId') eventId: string,
    @UploadedFiles() thumbnail: Array<Express.Multer.File>,
  ): Promise<any> {
    return this.eventService.uploadThumbnail(eventId, thumbnail);
  }

  @ApiOperation({ summary: 'Add event location' })
  @Post('location/:eventId')
  @UseGuards(JwtAuthGuard)
  async addLocation(@Param('eventId') eventId: string, @Body() location: CreateEventLocationDto): Promise<any> {
    return await this.eventService.addEventLocation(eventId, location);
  }
}
