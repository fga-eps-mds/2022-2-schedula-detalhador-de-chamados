import { IsNotEmpty, IsString } from 'class-validator';
import { ScheduleStatus } from '../schedule-status.enum';

export class CreateScheduleDto {
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
    message: 'Email do atendente não fornecido',
  })
  attendant_email: string;

  alerts: Date[];

  @IsString({ message: 'Informe uma descrição valida' })
  description: string;

  @IsNotEmpty({
    message: 'Status não fornecido',
  })
  status: string;
}
