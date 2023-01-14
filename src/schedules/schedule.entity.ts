import { Issue } from '../issue/issue.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  Relation,
  OneToOne,
} from 'typeorm';

import { Alert } from './alert.entity';
import { ScheduleStatus } from './schedule-status.enum';

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  dateTime: Date;

  @OneToOne(() => Issue)
  @JoinColumn()
  issue: Issue;

  @OneToMany(() => Alert, (alert: Alert) => alert.schedule, {
    cascade: true,
  })
  @JoinColumn()
  alerts: Relation<Alert[]>;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;
}
