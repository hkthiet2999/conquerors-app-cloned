import {
  Body,
  Delete,
  Param,
  Post,
  Put,
  Query,
  Req, Request, UploadedFiles,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth, ApiConsumes, ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from '../services/post.service';
import {PostEntity} from "../entities/post.entity";
import {CreatePostDto} from "../dtos/creat-post.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {AuthHelper} from "../../../helpter/auth-helper";
import {ApiMultiFiles} from "../../../decorators/api-files.decorator";
import {diskStorage} from "multer";
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {UpdatePostDto} from "../dtos/update-post.dto";
import {PostLocationDto} from "../dtos/post-location.dto";
import {QueryDto} from "../dtos/query.dto";

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`)
    }
  })

}

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostService) {}

  @Get('/:postId')
  async getPostDetails(@Param('postId') postId: string): Promise<PostEntity> {
    return await this.postsService.getPost(postId);
  }

  @Get('/me/:authorId')
  async getMyPosts(@Param('authorId') authorId: string): Promise<PostEntity[]> {
    return await this.postsService.getMyPosts(authorId);
  }

  @ApiOperation({ summary: 'Create new post' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  async createNewPost(
    @Request() req,
    @Body() post: CreatePostDto,
  ): Promise<any> {
    const author = AuthHelper.getEmailFromToken(req.headers.authorization)
    return await this.postsService.createPost(
      post,
      author,
    );
  }

  @ApiOperation({ summary: 'update post' })
  @ApiBearerAuth()
  @Put()
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param('postId') postId: string,
    @Body() post: UpdatePostDto,
  ): Promise<any> {
    return await this.postsService.updatePost(
      postId,
      post,
    );
  }

  @ApiOperation({ summary: 'upload post images' })
  @ApiConsumes('multipart/form-data')
  @ApiMultiFiles()
  @ApiBearerAuth()
  @Post('/upload/:postId')
  @UseInterceptors(FilesInterceptor('files',null,storage))
  async uploadPostImages(
    @Param('postId') postId: string,
    @UploadedFiles() files: Array<Express.Multer.File>
  ): Promise<any> {
    return this.postsService.uploadPostImages(postId,files)
  }

  @ApiOperation({ summary: 'Add post location' })
  @ApiBearerAuth()
  @Post('location/:postId')
  @UseGuards(JwtAuthGuard)
  async addLocation(
    @Param('postId') postId: string,
    @Body() location: PostLocationDto,
  ): Promise<any> {
    return await this.postsService.addPostLocation(
      postId,
      location,
    );
  }

  @ApiOperation({ summary: 'get posts location' })
  @ApiBearerAuth()
  @Post('/getPosts')
  @UseGuards(JwtAuthGuard)
  async getPostsByQuery(
    @Body() query: QueryDto,
  ): Promise<any> {
    return await this.postsService.getPostByQuery(
      query
    );
  }
}
