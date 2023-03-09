import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserProfileDto } from '../dtos/update-user.dto';
import { InviteUsersToEventDto } from '../dtos/invite-users-to-event.dto';
import { EventEntity } from '../../event/entities/event.entity';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

// This should be a real class/interface representing a user entity
export type User = { email: string; username: string; password?: string };

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    private cloudinary: CloudinaryService,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ email });
  }
  async findOne(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async updateOne(id: string, dto: UpdateUserProfileDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User dose not exist!');
    }
    const preload = await this.usersRepository.preload({
      ...dto,
      id: id,
    });

    return await this.usersRepository.save(preload);
  }

  async inviteEvent(userEmail: string, dto: InviteUsersToEventDto) {
    const user = await this.findOneByEmail(userEmail);
    if (!user) {
      throw new BadRequestException('User does not exits!');
    }
    const event = await this.eventRepository.findOneBy({ id: dto.eventId });
    if (!event) {
      throw new BadRequestException('Event does not exits!');
    }

    const invitedUsers = [];

    for (const userId of dto.userIds) {
      const userEntity = await this.findOne(userId);
      invitedUsers.push(userEntity);
    }

    const preload = await this.eventRepository.preload({
      ...event,
      participantsIds: invitedUsers,
      id: dto.eventId,
    });
    return await this.eventRepository.save(preload);
  }

  async uploadAvatar(email: string, files: Express.Multer.File[]) {
    const user = await this.findOneByEmail(email);
    let avatarUrl = '';
    if (!user) {
      throw new BadRequestException('User dose not exist!');
    }

    for (const file of files) {
      const uploaded: any = await this.cloudinary.uploadImage(file);
      avatarUrl = uploaded.url;
    }

    return avatarUrl;
  }
}
