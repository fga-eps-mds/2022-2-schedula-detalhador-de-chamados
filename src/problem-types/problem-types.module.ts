import { Module, forwardRef } from '@nestjs/common';
import { ProblemTypesService } from './problem-types.service';
import { ProblemTypesController } from './problem-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemType } from './entities/problem-type.entity';
import { ProblemCategoryModule } from '../problem-category/problem-category.module';
import { IssueModule } from '../issue/issue.module';

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
