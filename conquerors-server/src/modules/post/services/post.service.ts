import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "../entities/post.entity";
import {UsersService} from "../../users/services/users.service";
import {CreatePostDto} from "../dtos/creat-post.dto";
import {CloudinaryService} from "../../cloudinary/cloudinary.service";
import {UpdatePostDto} from "../dtos/update-post.dto";
import {PostLocationEntity} from "../entities/post-location.entity";
import {PostLocationDto} from "../dtos/post-location.dto";
import {QueryDto} from "../dtos/query.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(PostLocationEntity)
    private postLocationRepository: Repository<PostLocationEntity>,
    private  userService: UsersService,
    private  cloudinary: CloudinaryService
  ) {}

  async getPost(id: string): Promise<PostEntity> {
    const post = this.postRepository.findOne({where:{id:id}});
    return post;
  }

  async getMyPosts(authorId: string): Promise<PostEntity[]> {
    const posts = await this.postRepository.find({where:{ author: {id:authorId}}});
    return posts;
  }


  async deletePost(id: string): Promise<boolean> {
    const deleteResult = await this.postRepository.delete({ id });
    return deleteResult.affected === 1;
  }

  async createPost(
    post: CreatePostDto,
    authorEmail: string,

  ): Promise<any> {
    const author = await this.userService.findOneByEmail(authorEmail);
    if(!author) {
      throw new BadRequestException('User not found');
    }
    const newPost = new PostEntity();
    newPost.title = post.title;
    newPost.content = post.content;
    newPost.author = author;

    return  await this.postRepository.save(newPost);
  }
  async uploadPostImages(postId: string,images: any){
    const imgArr=[];
    for (const img of images) {
      const uploaded : any = await this.cloudinary.uploadImage(img);
      imgArr.push(uploaded.url);
    }
    const payload = new UpdatePostDto();
    return this.updatePost(postId,{...payload, images: imgArr});
  }

  async updatePost (postId: string, payload: UpdatePostDto ) {
    const post = await this.getPost(postId);
    let data : any;
    if(payload.content){
        data = {...post, content: payload.content }
    }
    else if(payload.images.length){
      data = {...post, images: payload.images }
    }
    const preload = await  this.postRepository.preload(data);
    return await this.postRepository.save(preload);
  }

  async addPostLocation (postId: string, payload: PostLocationDto ) {
    const post = await this.getPost(postId);
    const location = new PostLocationEntity();
    location.post = post;
    const savedLocation = await this.postLocationRepository.save({...location,...payload});
    const preload =  await this.postRepository.preload({...post, location: savedLocation});
    await this.postRepository.save(preload);
    return savedLocation;
  }
  async getPostByQuery (query : QueryDto) {
    let where = {};
    if (query.filter){
      where = {
        location:{
         ...(query.filter.street && { street: query.filter.street }),
          ...(query.filter.ward && { ward: query.filter.ward }),
          ...(query.filter.district && { district: query.filter.district }),
          ...(query.filter.province && { province: query.filter.province })
        }
      }
    }
    return  await this.postRepository.find({where:where, relations:["author", "location"]});
  }
}

