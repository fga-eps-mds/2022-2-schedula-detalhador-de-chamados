import { Module, forwardRef } from '@nestjs/common';
import { ProblemCategoryService } from './problem-category.service';
import { ProblemCategoryController } from './problem-category.controller';
import { ProblemCategory } from './entities/problem-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemTypesModule } from '../problem-types/problem-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProblemCategory]),
    forwardRef(() => ProblemTypesModule),
  ],
  controllers: [ProblemCategoryController],
  providers: [ProblemCategoryService],
  exports: [ProblemCategoryService],
})
export class ProblemCategoryModule {}
