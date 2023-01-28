import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProblemTypesService } from './problem-types.service';
import { CreateProblemTypeDto } from './dto/createProblem-type.dto';
import { ProblemType } from './entities/problem-type.entity';
import { UpdateProblemTypeDto } from './dto/updateProblem-type.dto';

@Controller('problem-types')
export class ProblemTypesController {
  constructor(private readonly problemTypesService: ProblemTypesService) {}

  @Get()
  async findAll(): Promise<ProblemType[]> {
    return await this.problemTypesService.findAll();
  }

  @Get(':id')
  async findProblemType(@Param('id') id: string): Promise<ProblemType> {
    return await this.problemTypesService.findProblemType(id);
  }

  @Post()
  async createProblemType(
    @Body() dto: CreateProblemTypeDto,
  ): Promise<ProblemType> {
    return await this.problemTypesService.createProblemType(dto);
  }

  @Put(':id')
  async updateProblemType(
    @Body() dto: UpdateProblemTypeDto,
    @Param('id') id: string,
  ): Promise<ProblemType> {
    return await this.problemTypesService.updateProblemType(id, dto);
  }

  @Delete(':id')
  async deleteProblemType(@Param('id') id: string): Promise<string> {
    return await this.problemTypesService.deleteProblemType(id);
  }
}
