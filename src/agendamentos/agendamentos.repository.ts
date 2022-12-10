/* import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Agendamento, Alerta } from './agendamento.entity';
import { CreateAgendamentodto } from './dto/createAgendamentodto';
import { UpdateAgendamentodto } from './dto/updateAgendamentodto';

@EntityRepository(Agendamento)
export class AgendamentoRepository extends Repository<Agendamento> {
    async createAgendamento(createAgendamentodto : CreateAgendamentodto) : Promise<Agendamento>{    
        const {chamado, dataEHora, alertas, descricao, status} = createAgendamentodto;

        const agendamento = this.create();
        //agendamento.chamado = chamado;
        agendamento.alertas = alertas;
        agendamento.descricao = descricao;
        agendamento.dataHora = dataEHora;
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

    async updateAgendamento(updateAgendamentodto : CreateAgendamentodto, agendamentoId : string) : Promise<Agendamento>{
        const agendamento = await this.findOneBy({id : agendamentoId});
        const {chamado, dataEHora, alertas, descricao, status} = updateAgendamentodto;

        //agendamento.chamado = chamado
        agendamento.alertas = alertas
        agendamento.descricao = descricao 
        agendamento.dataHora = dataEHora 
        agendamento.status = status 

        try{
            await this.save(agendamento);
            return agendamento;
        }catch(error){
            throw new InternalServerErrorException("Erro ao atualizar agendamento no banco de dados");
        }
    }

    async createAlert(datas: Date[]) : Promise<Alerta[]> {
        let alertas: Alerta[]

        datas.forEach(data => {
            let alerta = Alerta{}
        })
    }
} */
