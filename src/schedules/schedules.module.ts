import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { Alert } from './entities/alert.entity';
import { IssueModule } from '../issue/issue.module';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Alert]), IssueModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class ScheduleModule {}
