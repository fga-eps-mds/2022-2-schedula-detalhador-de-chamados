import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { Alert } from './alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Alert])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class ScheduleModule {}
