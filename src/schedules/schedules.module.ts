import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { Alert } from './alert.entity';
import { IssuesService } from '../issue/issue.service';
import { IssueModule } from 'src/issue/issue.module';
import { ProblemCategoryModule } from 'src/problem-category/problem-category.module';
import { ProblemTypesModule } from 'src/problem-types/problem-types.module';
import { ProblemCategoryService } from 'src/problem-category/problem-category.service';
import { ProblemTypesService } from 'src/problem-types/problem-types.service';
import { ProblemCategory } from 'src/problem-category/entities/problem-category.entity';
import { ProblemType } from 'src/problem-types/entities/problem-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Alert]), IssueModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class ScheduleModule {}
