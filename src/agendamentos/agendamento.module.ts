import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamento } from './agendamento.entity';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';
import { Alerta } from './alerta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamento, Alerta])],
  controllers: [AgendamentosController],
  providers: [AgendamentosService],
})
export class AgendamentoModule {}
