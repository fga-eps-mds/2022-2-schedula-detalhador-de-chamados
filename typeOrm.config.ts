import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Agendamento } from './src/agendamentos/agendamento.entity';
import { Alerta } from './src/agendamentos/alerta.entity';
import { Teste1670639446869 } from './migrations/1670639446869-Teste';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5105,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['./src/**/*.entity.ts'],
  migrations: [Teste1670639446869],
});
