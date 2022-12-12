import { IssueModule } from './issue/issue.module';
import { Module } from '@nestjs/common';
import configuration from './configs/configuration';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'schedula_core_db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'schedula_core',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    CallModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 