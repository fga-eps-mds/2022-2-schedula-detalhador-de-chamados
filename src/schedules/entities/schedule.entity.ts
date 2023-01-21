import { Issue } from '../../issue/entities/issue.entity';
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

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  dateTime: Date;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;

  @OneToOne(() => Issue, (issue: Issue) => issue.schedule)
  @JoinColumn()
  issue: Issue;

  @OneToMany(() => Alert, (alert: Alert) => alert.schedule, {
    cascade: true,
  })
  @JoinColumn()
  alerts: Relation<Alert[]>;
}
