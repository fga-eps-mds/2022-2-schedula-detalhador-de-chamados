import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Alerta } from './alerta.entity';

//Import da entidade de chamado ainda não feito
//import {Chamado} from '../chamados/chamado.entity.js';

@Entity()
export class Agendamento extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //Criação de relação um para um com um chamado
  /*@OneToOne(() => Chamado)
    @JoinColumn()
    chamado : Chamado;*/

  @Column({ nullable: true })
  dataHora: Date;

  @OneToMany(() => Alerta, (alerta) => alerta.agendamento, { cascade: true })
  @JoinColumn()
  alertas: Alerta[];

  @Column({ nullable: true })
  descricao: string;

  @Column()
  status: string;
}
