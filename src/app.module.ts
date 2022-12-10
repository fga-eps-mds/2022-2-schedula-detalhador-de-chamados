import { Module } from '@nestjs/common';
import configuration from './configs/configuration';
import { ConfigModule } from '@nestjs/config';
import { AgendamentoModule } from './agendamentos/agendamento.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), AgendamentoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
