import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { CreateEventDto } from '../dtos/create-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { UsersService } from '../../users/services/users.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { CreateEventLocationDto } from '../dtos/create-event-location.dto';
import { EventLocationEntity } from '../entities/event-location.entity';
import { QueryEventDto } from '../dtos/query-event.dto';
import { DateTimeUtil } from '../../../commons/untils/date-time.ultil';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    @InjectRepository(EventLocationEntity)
    private eventLocationRepository: Repository<EventLocationEntity>,
    private userService: UsersService,
    private cloudinary: CloudinaryService,
  ) {}

  async findOne(id: string): Promise<EventEntity> {
    const event = await this.eventRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!event) {
      throw new BadRequestException('Event dose not exist!');
    }
    return event;
  }

  async findAll(title: string = null): Promise<EventEntity[]> {
    return await this.eventRepository.find({
      ...(title && {
        where: {
          title: ILike(`%${Object.values(title)}%`),
        },
      }),
      take: 6,
    });
  }

  async create(email: string, dto: CreateEventDto): Promise<EventEntity> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Cannot create new event without author!');
    }
    const instance = await this.eventRepository.create({ ...dto, authorId: user.id });
    return await this.eventRepository.save(instance);
  }

  async update(id: string, dto: UpdateEventDto | any): Promise<EventEntity> {
    const eventInstance = await this.eventRepository.preload({
      ...dto,
      id: id,
    });
    return await this.eventRepository.save(eventInstance);
  }

  async delete(id: string) {
    const event = await this.findOne(id);
    return await this.eventRepository.remove(event);
  }

  async uploadThumbnail(eventId: string, thumbnail: any) {
    const imgArr = [];
    for (const img of thumbnail) {
      const uploaded: any = await this.cloudinary.uploadImage(img);
      imgArr.push(uploaded.url);
    }

    const event = await this.findOne(eventId);

    const preloadEvent = await this.eventRepository.preload({
      ...event,
      thumbnail: imgArr[0],
    });

    return await this.eventRepository.save(preloadEvent);
  }

  async addEventLocation(eventId: string, dto: CreateEventLocationDto) {
    const event = await this.findOne(eventId);
    const location = new EventLocationEntity();
    location.event = event;
    const savedLocation = await this.eventLocationRepository.save({ ...location, ...dto });
    const preload = await this.eventRepository.preload({ ...event, location: savedLocation });
    await this.eventRepository.save(preload);
    return savedLocation;
  }

  async getEventByQuery(query: QueryEventDto) {
    let where = {};
    if (query.filter) {
      where = {
        location: {
          ...(query.filter.street && { street: query.filter.street }),
          ...(query.filter.ward && { ward: query.filter.ward }),
          ...(query.filter.district && { district: query.filter.district }),
          ...(query.filter.province && { province: query.filter.province }),
        },
      };
    }
    return await this.eventRepository.find({ where: where, relations: ['location'], take: 6 });
  }

  async getStatus(id: string) {
    const event = await this.findOne(id);

    const aaa = DateTimeUtil.isBetween(new Date(), event.startDate, event.endDate);

    const bbb = DateTimeUtil.compareDates(new Date(), event.endDate);
    console.log('harry-log: 🚀  file: event.service.ts ~  line: 120 ~ class: EventService ~  getStatus ~ : ', bbb);

    return;
  }
}
