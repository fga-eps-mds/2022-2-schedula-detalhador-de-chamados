import { Body, Controller, Post } from '@nestjs/common';
import { CreateAgendamentodto, ReturnAgendamentodto } from './agendamentodto';
import { AgendamentosService } from './agendamentos.service';

@Controller('agendamentos')
export class AgendamentosController {

    constructor(private agendamentosService: AgendamentosService) { }

    @Post()
    async createAgendamento(@Body() createAgendamentodto : CreateAgendamentodto) : Promise<ReturnAgendamentodto> {
        const agendamento = await this.agendamentosService.createAgendamento(createAgendamentodto);
        return {
            agendamento,
            message: 'Agendamento criado com sucesso'
        }
    }
}
