import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProblemTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  problem_category_id: string;

  issues_ids: string[];
}
