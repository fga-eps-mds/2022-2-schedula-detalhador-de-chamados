import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from './issue.entity';
import { CreateIssuedto } from './dto/createIssuedto';
import { UpdateIssuedto } from './dto/updateIssuedto';
import { ProblemType } from '../problem-types/entities/problem-type.entity';
import { ProblemTypesService } from '../problem-types/problem-types.service';
import { ProblemCategory } from '../problem-category/entities/problem-category.entity';
import { ProblemCategoryService } from '../problem-category/problem-category.service';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private IssueRepo: Repository<Issue>,
    @Inject(forwardRef(() => ProblemTypesService))
    private problem_types_service: ProblemTypesService,
    @Inject(forwardRef(() => ProblemCategoryService))
    private problem_category_service: ProblemCategoryService,
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

  async createIssue(createIssuedto: CreateIssuedto): Promise<Issue> {
    const problem_category: ProblemCategory =
      await this.problem_category_service.findProblemCategoryById(
        createIssuedto.problem_category_id,
      );
    const problem_types: ProblemType[] = await this.updateProblemTypes(
      createIssuedto.problem_types_ids,
    );
    const issue = this.IssueRepo.create({
      ...createIssuedto,
      problem_category,
      problem_types,
    });
    try {
      return await this.IssueRepo.save(issue);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findIssues(): Promise<Issue[]> {
    const issues = await this.IssueRepo.find({
      relations: ['problem_category', 'problem_types'],
    });
    if (!issues)
      throw new NotFoundException('Não existem chamados cadastrados');
    return issues;
  }

  async findIssueById(issueId: string): Promise<Issue> {
    const Issue = await this.IssueRepo.findOne({
      where: { id: issueId },
      relations: ['problem_category', 'problem_types'],
    });
    if (!Issue) throw new NotFoundException('Chamado não encontrado');
    return Issue;
  }

  async updateIssue(
    updateIssuedto: UpdateIssuedto,
    issueId: string,
  ): Promise<Issue> {
    const issue = await this.IssueRepo.findOneBy({
      id: issueId,
    });

    try {
      const problem_category: ProblemCategory =
        updateIssuedto.problem_category_id
          ? await this.problem_category_service.findProblemCategoryById(
              updateIssuedto.problem_category_id,
            )
          : issue.problem_category;
      const problem_types: ProblemType[] = updateIssuedto.problem_types_ids
        ? await this.updateProblemTypes(updateIssuedto.problem_types_ids)
        : issue.problem_types;
      await this.IssueRepo.save({
        id: issueId,
        ...updateIssuedto,
        problem_category,
        problem_types,
      });
      return await this.IssueRepo.findOneBy({
        id: issueId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteIssue(issueId: string) {
    const result = await this.IssueRepo.delete({ id: issueId });
    if (result.affected === 0) {
      throw new NotFoundException('Não foi encontrado um chamado com este id');
    }
  }
}
