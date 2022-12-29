import { IssueModule } from './issue/issue.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module, CacheModule } from '@nestjs/common';
import configuration from './configs/configuration';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from './schedules/schedules.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const configService = configuration();

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.database.host,
      port: 5432,
      username: configService.database.user,
      password: configService.database.pass,
      database: configService.database.db,
      autoLoadEntities: true,
      synchronize: false,
    }),
    CacheModule.register({ isGlobal: true }),
    ScheduleModule,
    IssueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
