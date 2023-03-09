import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/users.entity';
import { ReactionStatusEnum } from '../common/enums/reaction-type.enum';
import { PostEntity } from '../../post/entities/post.entity';
import { TypeOrmBaseEntity } from '../../../commons/abstract-entity/type-orm-base-entity.entity';

@Entity('reaction')
export class ReactionEntity extends TypeOrmBaseEntity {
  @Column({
    type: 'enum',
    enum: ReactionStatusEnum,
    nullable: false,
  })
  status: ReactionStatusEnum;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.id)
  @JoinColumn()
  post: PostEntity;
}
