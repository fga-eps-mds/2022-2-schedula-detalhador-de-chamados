import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './issue.entity';
import { IssuesController } from './issue.controller';
import { IssuesService } from './issue.service';
import { ProblemCategoryModule } from 'src/problem-category/problem-category.module';
import { ProblemTypesModule } from 'src/problem-types/problem-types.module';
import { ProblemCategoryService } from '../problem-category/problem-category.service';
import { ProblemTypesService } from 'src/problem-types/problem-types.service';
import { ProblemCategory } from 'src/problem-category/entities/problem-category.entity';
import { ProblemType } from 'src/problem-types/entities/problem-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Issue, ProblemCategory, ProblemType]),
    forwardRef(() => ProblemCategoryModule),
    forwardRef(() => ProblemTypesModule),
  ],
  controllers: [IssuesController],
  providers: [IssuesService],
  exports: [IssuesService],
})
export class IssueModule {}
