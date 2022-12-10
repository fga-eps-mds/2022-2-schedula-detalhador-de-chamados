import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { get } from 'http';
import { Agendamento } from './agendamento.entity';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentodto } from './dto/createAgendamentodto';

@Controller('agendamentos')
export class AgendamentosController {
  constructor(private agendamentosService: AgendamentosService) {}

  @Post()
  async createAgendamento(
    @Body() createAgendamentodto: CreateAgendamentodto,
  ): Promise<Agendamento> {
    const agendamento = await this.agendamentosService.createAgendamento(
      createAgendamentodto,
    );
    return agendamento;
  }

  @Get()
  async getAgendamentos(): Promise<Agendamento[]> {
    const agendamentos = await this.agendamentosService.findAgendamentos();
    return agendamentos;
  }

  @Get(':id')
  async getAgendamento(@Param('id') id: string): Promise<Agendamento> {
    const agendamento = await this.agendamentosService.findAgendamentoById(id);
    return agendamento;
  }

  @Put(':id')
  async updateAgendamento(
    @Param('id') id: string,
    @Body() updateAgendamentodto: CreateAgendamentodto,
  ): Promise<Agendamento> {
    const agendamento = await this.agendamentosService.updateAgendamento(
      updateAgendamentodto,
      id,
    );
    return agendamento;
  }

  @Delete(':id')
  async deleteAgendamento(@Param('id') id: string) {
    const agendamento = await this.agendamentosService.deleteAgendamento(id);
    return {
      message: 'Agendamento removido com sucesso',
    };
  }
}
