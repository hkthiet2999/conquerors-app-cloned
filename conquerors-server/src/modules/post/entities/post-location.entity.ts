import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import {TypeOrmBaseEntity} from "../../../commons/abstract-entity/type-orm-base-entity.entity";
import {PostEntity} from "./post.entity";

@Entity('postLocation')
export class PostLocationEntity extends TypeOrmBaseEntity {
  @Column({nullable:true})
  street: string;

  @Column({nullable:true})
  ward: string;

  @Column({nullable:true})
  district: string;

  @Column({nullable:true})
  province: string;

  @OneToOne(() => PostEntity)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}

