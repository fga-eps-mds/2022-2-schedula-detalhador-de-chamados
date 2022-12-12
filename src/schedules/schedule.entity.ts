import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  Relation,
} from 'typeorm';

import { Alert } from './alert.entity';

//import {Chamado} from '../chamados/chamado.entity.js';

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //Criação de relação um para um com um chamado
  //@OneToOne(() => Chamado)
  //@JoinColumn()
  //chamado : Chamado;

  @Column({ nullable: true })
  dateTime: Date;

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
