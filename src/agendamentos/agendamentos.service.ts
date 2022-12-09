import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agendamento } from './agendamento.entity';
import { AgendamentoRepository } from './agendamentos.repository';
import { CreateAgendamentodto } from './dto/createAgendamentodto';
import { UpdateAgendamentodto } from './dto/updateAgendamentodto';

@Injectable()
export class AgendamentosService {
    constructor(@InjectRepository(AgendamentoRepository)
    private agendamentoRepository: AgendamentoRepository,) {}

    async createAgendamento(createAgendamentodto : CreateAgendamentodto) : Promise<Agendamento>{
        return this.agendamentoRepository.createAgendamento(createAgendamentodto);
    }

    async findAgendamentos() : Promise<Agendamento[]>{
        const agendamentos = this.agendamentoRepository.find();
        if(!agendamentos) throw new NotFoundException("Nao existem agendamentos cadastrados");
        return agendamentos;
    }

    async findAgendamentoById(agendamentoId : string) : Promise<Agendamento>{
        const agendamento = await this.agendamentoRepository.findOne({where: {id : agendamentoId}});
        if(!agendamento) throw new NotFoundException("Agendamento não encontrado");
        return agendamento;
    }

    async updateAgendamento(updateAgendamentodto : UpdateAgendamentodto, agendamentoId : string) : Promise<Agendamento>{
        return this.agendamentoRepository.updateAgendamento(updateAgendamentodto, agendamentoId);
    }

    async deleteAgendamento(agendamentoId : string){
        const result = await this.agendamentoRepository.delete({id : agendamentoId});
        if(result.affected === 0){
            throw new NotFoundException("Nao foi encontrado um agendamento com este id");
        }
    }
}
