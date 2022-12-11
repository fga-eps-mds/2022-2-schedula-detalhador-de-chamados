import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { Scheduling } from './scheduling.entity';

@Entity()
export class Alert extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @ManyToOne(() => Scheduling, (scheduling: Scheduling) => scheduling.alerts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  scheduling: Relation<Scheduling>;
}
