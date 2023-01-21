import { Module, forwardRef } from '@nestjs/common';
import { ProblemTypesService } from './problem-types.service';
import { ProblemTypesController } from './problem-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemType } from './entities/problem-type.entity';
import { ProblemCategoryModule } from 'src/problem-category/problem-category.module';
import { ProblemCategory } from 'src/problem-category/entities/problem-category.entity';
import { ProblemCategoryService } from 'src/problem-category/problem-category.service';
import { Issue } from 'src/issue/issue.entity';
import { IssuesService } from 'src/issue/issue.service';
import { IssueModule } from 'src/issue/issue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProblemType]),
    forwardRef(() => IssueModule),
    forwardRef(() => ProblemCategoryModule),
  ],
  controllers: [ProblemTypesController],
  providers: [ProblemTypesService],
  exports: [ProblemTypesService],
})
export class ProblemTypesModule {}
