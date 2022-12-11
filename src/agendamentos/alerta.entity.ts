import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { Agendamento } from './agendamento.entity';

@Entity()
export class Alerta extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @ManyToOne(
    () => Agendamento,
    (agendamento: Agendamento) => agendamento.alertas,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  agendamento: Relation<Agendamento>;
}
