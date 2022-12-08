import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5105,
  username: 'postgres',
  password: 'postgres',
  database: 'schedula_core',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};