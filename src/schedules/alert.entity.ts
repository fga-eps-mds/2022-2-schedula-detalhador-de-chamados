import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { Schedule } from './schedule.entity';

@Entity()
export class Alert extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @ManyToOne(() => Schedule, (schedule: Schedule) => schedule.alerts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  schedule: Relation<Schedule>;
}
