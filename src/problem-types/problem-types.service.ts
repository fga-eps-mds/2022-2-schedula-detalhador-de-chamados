import {
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { ProblemType } from './entities/problem-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProblemTypeDto } from './dto/createProblem-type.dto';
import { ProblemCategory } from '../problem-category/entities/problem-category.entity';
import { ProblemCategoryService } from '../problem-category/problem-category.service';
import { Issue } from 'src/issue/issue.entity';
import { IssuesService } from '../issue/issue.service';
import { UpdateProblemTypeDto } from './dto/updateProblem-type.dto';

@Injectable()
export class ProblemTypesService {
  constructor(
    @InjectRepository(ProblemType)
    private problem_typeRepo: Repository<ProblemType>,
    @Inject(forwardRef(() => ProblemCategoryService))
    private problem_category_service: ProblemCategoryService,
    @Inject(forwardRef(() => IssuesService))
    private issue_service: IssuesService,
  ) {}

  async UpdateIssues(issues_ids: string[]): Promise<Issue[]> {
    const issues: Issue[] = [];
    for (const i in issues_ids) {
      const issue = await this.issue_service.findIssueById(issues_ids[i]);
      issues.push(issue);
    }
    return issues;
  }

  async findAll(): Promise<ProblemType[]> {
    try {
      return await this.problem_typeRepo.find();
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findProblemType(id: string): Promise<ProblemType> {
    try {
      return await this.problem_typeRepo.findOneBy({ id });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async createProblemType(dto: CreateProblemTypeDto): Promise<ProblemType> {
    try {
      const problem_category: ProblemCategory =
        await this.problem_category_service.findProblemCategoryById(
          dto.problem_category_id,
        );

      const issues: Issue[] = dto.issues_ids
        ? await this.UpdateIssues(dto.issues_ids)
        : [];
      const problem_type = this.problem_typeRepo.create({
        ...dto,
        problem_category,
        issues,
      });
      await this.problem_typeRepo.save(problem_type);
      return problem_type;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateProblemType(
    id: string,
    dto: UpdateProblemTypeDto,
  ): Promise<ProblemType> {
    try {
      const problem_type = await this.problem_typeRepo.findOneBy({ id });

      const problem_category: ProblemCategory = dto.problem_category_id
        ? await this.problem_category_service.findProblemCategoryById(
            dto.problem_category_id,
          )
        : problem_type.problem_category;

      const issues: Issue[] = dto.issues_ids
        ? await this.UpdateIssues(dto.issues_ids)
        : problem_type.issues;

      await this.problem_typeRepo.save({
        id,
        ...dto,
        problem_category,
        issues,
      });
      const res = await this.problem_typeRepo.findOneBy({ id });
      return res;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteProblemType(id: string): Promise<string> {
    try {
      this.problem_typeRepo.delete({ id });
      return 'Deletado com sucesso';
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
