import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/post.controller';
import { PostEntity } from './entities/post.entity';
import { PostService } from './services/post.service';
import {UsersModule} from "../users/users.module";
import {MulterModule} from "@nestjs/platform-express";
import {CloudinaryModule} from "../cloudinary/cloudinary.module";
import {PostLocationEntity} from "./entities/post-location.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostLocationEntity]), MulterModule.register({
    dest: './uploads',
  }),UsersModule, CloudinaryModule],
  controllers: [PostsController],
  exports: [PostService],
  providers: [PostService],
})
export class PostsModule {}
