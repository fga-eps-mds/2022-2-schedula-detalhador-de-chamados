import { InjectRepository } from '@nestjs/typeorm';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProblemCategoryDto } from './dto/create-problem-category.dto';
import { UpdateProblemCategoryDto } from './dto/update-problem-category.dto';
import { ProblemCategory } from './entities/problem-category.entity';
import { ProblemTypesService } from '../problem-types/problem-types.service';
import { ProblemType } from '../problem-types/entities/problem-type.entity';

@Injectable()
export class ProblemCategoryService {
  constructor(
    @InjectRepository(ProblemCategory)
    private problemCategoryRepository: Repository<ProblemCategory>,
    @Inject(forwardRef(() => ProblemTypesService))
    private problem_types_service: ProblemTypesService,
  ) {}

  async updateProblemTypes(
    problem_types_ids: string[],
  ): Promise<ProblemType[]> {
    const problem_types: ProblemType[] = [];
    for (const i in problem_types_ids) {
      const problem_type = await this.problem_types_service.findProblemType(
        problem_types_ids[i],
      );
      problem_types.push(problem_type);
    }
    return problem_types;
  }

  async createProblemCategory(
    createProblemCategoryDto: CreateProblemCategoryDto,
  ): Promise<ProblemCategory> {
    const problem_types: ProblemType[] =
      createProblemCategoryDto.problem_types_ids
        ? await this.updateProblemTypes(
            createProblemCategoryDto.problem_types_ids,
          )
        : [];
    const problemCategory = this.problemCategoryRepository.create({
      ...createProblemCategoryDto,
      problem_types,
    });
    try {
      return await this.problemCategoryRepository.save(problemCategory);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar a categoria no banco de dados',
      );
    }
  }

  async findProblemCategories(): Promise<ProblemCategory[]> {
    try {
      return this.problemCategoryRepository.find({
        relations: ['problem_types'],
      });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findProblemCategoryById(id: string): Promise<ProblemCategory> {
    const problemCategory = await this.problemCategoryRepository.findOne({
      where: { id },
      relations: ['problem_types'],
    });
    if (!problemCategory) {
      throw new NotFoundException('Categoria de problema não encontrada');
    }
    return problemCategory;
  }

  async updateProblemCategory(
    id: string,
    dto: UpdateProblemCategoryDto,
  ): Promise<ProblemCategory> {
    try {
      const problemCategory = await this.problemCategoryRepository.findOneBy({
        id,
      });
      const problem_types: ProblemType[] = dto.problem_types_ids
        ? await this.updateProblemTypes(dto.problem_types_ids)
        : problemCategory.problem_types;

      await this.problemCategoryRepository.save({
        id,
        ...dto,
        problem_types,
      });
      return this.problemCategoryRepository.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteProblemCategory(id: string) {
    const category = await this.problemCategoryRepository.findOne({
      where: { id },
      relations: ['problem_types'],
    });
    if (!category) {
      throw new NotFoundException(
        'Não foi encontrada uma categoria de problema com o ID informado',
      );
    }
    await this.problemCategoryRepository.softRemove(category);
  }
}
