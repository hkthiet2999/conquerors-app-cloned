import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ReactionService } from './services/reaction.service';
import { ReactionController } from './controllers/reaction.controller';
import { ReactionEntity } from './entities/reaction.entity';
import { PostsModule } from '../post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionEntity]), UsersModule, PostsModule],
  controllers: [ReactionController],
  providers: [ReactionService],
  exports: [ReactionService],
})
export class ReactionModule {}
