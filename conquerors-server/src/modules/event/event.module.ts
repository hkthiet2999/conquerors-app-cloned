import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './services/event.service';
import { EventEntity } from './entities/event.entity';
import { EventController } from './controllers/event.controller';
import { UsersModule } from '../users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { EventLocationEntity } from './entities/event-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, EventLocationEntity]),
    UsersModule,
    MulterModule.register({
      dest: './uploads',
    }),
    CloudinaryModule,
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
