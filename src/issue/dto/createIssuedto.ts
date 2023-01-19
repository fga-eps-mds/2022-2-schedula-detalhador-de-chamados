import { IsNotEmpty } from 'class-validator';

export class CreateIssuedto {
  @IsNotEmpty({
    message: 'Solicitante não fornecido',
  })
  requester: string;

  @IsNotEmpty({
    message: 'Telefone não fornecido',
  })
  phone: string;

  @IsNotEmpty({
    message: 'Cidade não fornecido',
  })
  city: string;

  @IsNotEmpty({
    message: 'Posto de Trabalho não fornecido',
  })
  workstation: string;

  @IsNotEmpty({
    message: 'categoria do Problema não fornecido',
  })
  problem_category: string;

  @IsNotEmpty({
    message: 'Tipo do Problema não fornecido',
  })
  problem_type: string;

  @IsNotEmpty({
    message: 'Data não fornecido',
  })
  date: Date;

  @IsNotEmpty({
    message: 'email não fornecido',
  })
  email: string;
}
