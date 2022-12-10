import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Agendamento } from './agendamento.entity';

@Entity()
export class Alerta extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @ManyToOne(() => Agendamento, (agendamento) => agendamento.alertas,  { onDelete: 'CASCADE' })
  agendamento: Agendamento;
}
