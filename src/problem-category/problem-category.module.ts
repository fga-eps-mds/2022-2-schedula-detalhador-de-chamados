import { Module, forwardRef } from '@nestjs/common';
import { ProblemCategoryService } from './problem-category.service';
import { ProblemCategoryController } from './problem-category.controller';
import { ProblemCategory } from './entities/problem-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemTypesModule } from 'src/problem-types/problem-types.module';
import { ProblemType } from 'src/problem-types/entities/problem-type.entity';
import { ProblemTypesService } from 'src/problem-types/problem-types.service';

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
