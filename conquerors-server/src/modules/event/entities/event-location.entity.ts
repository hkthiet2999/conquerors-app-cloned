import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { TypeOrmBaseEntity } from '../../../commons/abstract-entity/type-orm-base-entity.entity';
import { EventEntity } from './event.entity';

@Entity('eventLocation')
export class EventLocationEntity extends TypeOrmBaseEntity {
  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  ward: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  province: string;

  @OneToOne(() => EventEntity)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;
}
