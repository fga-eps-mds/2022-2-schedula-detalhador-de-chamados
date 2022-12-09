import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
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

    @Column({nullable: true})
    dataEHora : Date;

    @Column()
    alertas : Date[];

    @Column({nullable: true})
    descricao : string;

    @Column()
    status : string;
}
