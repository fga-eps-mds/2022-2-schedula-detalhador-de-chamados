import { DataSource } from 'typeorm';
import { Teste1670639446869 } from './migrations/1670639446869-Teste';
import { Relation1670730610205 } from './migrations/1670730610205-Relation';
import configuration from 'src/configs/configuration';

const configService = configuration();

export default new DataSource({
  type: 'postgres',
  host: configService.database.host,
  port: configService.database.port,
  username: configService.database.user,
  password: configService.database.pass,
  database: configService.database.db,
  entities: ['./src/**/*.entity.ts'],
  migrations: [Teste1670639446869, Relation1670730610205],
});
