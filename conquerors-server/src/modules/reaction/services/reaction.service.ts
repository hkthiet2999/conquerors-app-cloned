import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReactionEntity } from '../entities/reaction.entity';
import { CreateReactionDto } from '../dtos/create-reaction.dto';
import { UsersService } from '../../users/services/users.service';
import { PostService } from '../../post/services/post.service';
import { ReactionStatusEnum } from '../common/enums/reaction-type.enum';
import { PostEntity } from '../../post/entities/post.entity';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(ReactionEntity)
    private reactionRepository: Repository<ReactionEntity>,
    private userService: UsersService,
    private postService: PostService,
  ) {}

  async findOne(id: string): Promise<ReactionEntity> {
    const reaction = await this.reactionRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user', 'post'],
    });

    if (!reaction) {
      throw new BadRequestException('Cannot find reaction!');
    }
    return reaction;
  }

  async react(authorEmail, dto: CreateReactionDto): Promise<ReactionEntity> {
    // find user and post
    const user = await this.userService.findOneByEmail(authorEmail);
    if (!user) {
      throw new BadRequestException('Cannot react without author!');
    }
    const post = await this.postService.getPost(dto.postId);
    if (!post) {
      throw new BadRequestException('Cannot react without post');
    }

    // find reaction
    const reacted = await this.findReactedPostByUser(user, post);
    if (!reacted) {
      const instance = await this.reactionRepository.create({ ...dto, user: user, post: post });
      return await this.reactionRepository.save(instance);
    } else {
      if (dto.status === reacted.status) {
        return reacted;
      }

      const preload = await this.reactionRepository.preload({
        ...reacted,
        status: dto.status,
        id: reacted.id,
      });

      return await this.reactionRepository.save(preload);
    }
  }

  async findReactedPostByUser(user, post) {
    return await this.reactionRepository.findOne({
      where: {
        user: { id: user.id },
        post: { id: post.id },
      },
    });
  }

  // TODO: count reaction of post
  // private async updatePostReactCount(post: PostEntity, status: ReactionStatusEnum): Promise<PostEntity> {
  //   if(status === ReactionStatusEnum.LIKE){
  //     const preloadPost = await this.
  //     return this.postService.updatePost()
  //   }
  //   return;
  // }
}
