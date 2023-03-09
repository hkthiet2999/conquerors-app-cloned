import { UserEntity } from '../../users/entities/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import {TypeOrmBaseEntity} from "../../../commons/abstract-entity/type-orm-base-entity.entity";
import {PostLocationEntity} from "./post-location.entity";

@Entity('post')
export class PostEntity extends TypeOrmBaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column('json', { default: [] })
  images: Array<string>;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'authorId' })
  author: UserEntity;

  @Column({ name: 'likeCount', default: 0 })
  likeCount: number;

  @Column({ name: 'dislikeCount', default: 0 })
  dislikeCount: number;

  @OneToOne(() => PostLocationEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'locationId'})
  location: PostLocationEntity;
}

