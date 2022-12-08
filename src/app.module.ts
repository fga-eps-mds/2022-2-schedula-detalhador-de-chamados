import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AgendamentoModule } from './agendamentos/agendamento.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AgendamentoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
