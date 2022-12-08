import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    TableForeignKey,
    OneToOne,
    JoinColumn,
  } from 'typeorm';

//Import da entidade de chamado ainda não feito
//import {Chamado} from '../chamados/chamado.entity.js';

@Entity()
export class Agendamento extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    //Criação de relação um para um com um chamado
    /*@OneToOne(() => Chamado)
    @JoinColumn()
    chamado : Chamado;*/

    @Column()
    dataEHora : Date;

    @Column({nullable: true})
    alertas : Date[];

    @Column({nullable: true})
    descricao : string;
}
