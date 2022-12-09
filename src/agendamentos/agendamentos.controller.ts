import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Agendamento } from './agendamento.entity';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentodto } from './dto/createAgendamentodto';
import { ReturnAgendamentodto } from './dto/returnAgendamentodto';
import { UpdateAgendamentodto } from './dto/updateAgendamentodto';

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

    @Get()
    async getAgendamentos() : Promise<Agendamento[]> {
        const agendamentos = await this.agendamentosService.findAgendamentos();
        return agendamentos;
    }

    @Get(':id')
    async getAgendamento(@Param('id') id : string) : Promise<ReturnAgendamentodto> { 
        const agendamento = await this.agendamentosService.findAgendamentoById(id);
        return {
            agendamento,
            message: 'Agendamento encontrado com sucesso'
        };
    }

    @Patch(':id')
    async updateAgendamento(@Param('id') id : string, @Body() updateAgendamentodto : UpdateAgendamentodto) : Promise<ReturnAgendamentodto> {
        const agendamento = await this.agendamentosService.updateAgendamento(updateAgendamentodto, id);
        return{
            agendamento,
            message: "Agendamento atualizado com sucesso"
        };
    }

    @Delete(':id')
    async deleteAgendamento(@Param('id') id : string){
        const agendamento = await this.agendamentosService.deleteAgendamento(id);
        return{
            message: "Agendamento removido com sucesso"
        };
    }
}
