import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamentoRepository } from './agendamentos.repository';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';

@Module({
    imports:[TypeOrmModule.forFeature([AgendamentoRepository])],
    controllers: [AgendamentosController],
    providers: [AgendamentosService],
})
export class AgendamentoModule {
}
