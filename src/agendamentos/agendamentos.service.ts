import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agendamento } from './agendamento.entity';
import { CreateAgendamentodto } from './agendamentodto';
import { AgendamentoRepository } from './agendamentos.repository';

@Injectable()
export class AgendamentosService {
    constructor(@InjectRepository(AgendamentoRepository)
    private agendamentoRepository: AgendamentoRepository,) {}

    async createAgendamento(createAgendamentodto : CreateAgendamentodto) : Promise<Agendamento>{
        return this.agendamentoRepository.createAgendamento(createAgendamentodto);
    }

}
