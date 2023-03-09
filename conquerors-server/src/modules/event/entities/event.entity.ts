import { Column, Entity, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/users.entity';
import { TypeOrmBaseEntity } from '../../../commons/abstract-entity/type-orm-base-entity.entity';
import { PostLocationEntity } from '../../post/entities/post-location.entity';
import {EventLocationEntity} from "./event-location.entity";

@Entity('event')
export class EventEntity extends TypeOrmBaseEntity {
  @Column({
    type: 'varchar',
  })
  public title: string;

  @OneToOne(() => EventLocationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'locationId' })
  location: PostLocationEntity;

  @Column({
    type: 'timestamp',
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
  })
  endDate: Date;

  @ManyToMany(() => UserEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  participantsIds: UserEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  authorId: string;

  @Column('varchar', {
    nullable: true,
  })
  thumbnail: string;
}
