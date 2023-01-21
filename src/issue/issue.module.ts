import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './issue.entity';
import { IssuesController } from './issue.controller';
import { IssuesService } from './issue.service';
import { ProblemCategoryModule } from '../problem-category/problem-category.module';
import { ProblemTypesModule } from '../problem-types/problem-types.module';
import { ProblemCategory } from '../problem-category/entities/problem-category.entity';
import { ProblemType } from '../problem-types/entities/problem-type.entity';

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
