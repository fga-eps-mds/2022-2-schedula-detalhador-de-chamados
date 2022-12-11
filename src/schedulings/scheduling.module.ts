import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scheduling } from './scheduling.entity';
import { SchedulingsController } from './schedulings.controller';
import { SchedulingsService } from './schedulings.service';
import { Alert } from './alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scheduling, Alert])],
  controllers: [SchedulingsController],
  providers: [SchedulingsService],
})
export class SchedulingModule {}
