import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { Alert } from './alert.entity';
import { IssuesService } from '../issue/issue.service';
import { Issue } from '../issue/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Alert, Issue])],
  controllers: [SchedulesController],
  providers: [SchedulesService, IssuesService],
})
export class ScheduleModule {}
