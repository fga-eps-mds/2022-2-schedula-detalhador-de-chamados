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

//Import da entidade de chamado ainda não feito
//import {Chamado} from '../chamados/chamado.entity.js';

@Entity()
export class Scheduling extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //Criação de relação um para um com um chamado
  /*@OneToOne(() => Chamado)
    @JoinColumn()
    chamado : Chamado;*/

  @Column({ nullable: true })
  dateTime: Date;

  @OneToMany(() => Alert, (alert: Alert) => alert.scheduling, {
    cascade: true,
  })
  @JoinColumn()
  alerts: Relation<Alert[]>;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;
}
