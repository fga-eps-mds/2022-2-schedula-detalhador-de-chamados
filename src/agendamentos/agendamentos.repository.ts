import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Agendamento } from './agendamento.entity';
import { CreateAgendamentodto } from './agendamentodto';

@EntityRepository(Agendamento)
export class AgendamentoRepository extends Repository<Agendamento> {
    async createAgendamento(createAgendamentodto : CreateAgendamentodto) : Promise<Agendamento>{    
        const {/*chamado, */dataEHora, alertas, descricao} = createAgendamentodto;

        const agendamento = this.create();
        //agendamento.chamado = chamado;
        agendamento.alertas = alertas;
        agendamento.descricao = descricao;
        agendamento.dataEHora = dataEHora;

        try{
            await agendamento.save();
            return agendamento;
        }catch(error){
            throw new InternalServerErrorException(
                'Erro ao salvar o agendamento no banco de dados',
              );
        }

    }
}