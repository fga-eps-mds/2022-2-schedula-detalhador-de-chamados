import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Agendamento } from './agendamento.entity';
import { CreateAgendamentodto } from './dto/createAgendamentodto';
import { UpdateAgendamentodto } from './dto/updateAgendamentodto';

@EntityRepository(Agendamento)
export class AgendamentoRepository extends Repository<Agendamento> {
    async createAgendamento(createAgendamentodto : CreateAgendamentodto) : Promise<Agendamento>{    
        const {/*chamado, */dataEHora, alertas, descricao, status} = createAgendamentodto;

        const agendamento = this.create();
        //agendamento.chamado = chamado;
        agendamento.alertas = alertas;
        agendamento.descricao = descricao;
        agendamento.dataEHora = dataEHora;
        agendamento.status = status;

        try{
            await agendamento.save();
            return agendamento;
        }catch(error){
            throw new InternalServerErrorException(
                'Erro ao salvar o agendamento no banco de dados',
              );
        }

    }

    async updateAgendamento(updateAgendamentodto : UpdateAgendamentodto, agendamentoId : string) : Promise<Agendamento>{
        const agendamento = await this.findOne({where: {id : agendamentoId}});
        const {/*chamado, */dataEHora, alertas, descricao, status} = updateAgendamentodto;

        //agendamento.chamado = chamado ? chamado : agendamento.chamado;
        agendamento.alertas = alertas ? alertas : agendamento.alertas;
        agendamento.descricao = descricao ? descricao : agendamento.descricao;
        agendamento.dataEHora = dataEHora ? dataEHora : agendamento.dataEHora;
        agendamento.status = status ? status : agendamento.status;

        try{
            await this.save(agendamento);
            return agendamento;
        }catch(error){
            throw new InternalServerErrorException("Erro ao atualizar agendamento no banco de dados");
        }
    }
}