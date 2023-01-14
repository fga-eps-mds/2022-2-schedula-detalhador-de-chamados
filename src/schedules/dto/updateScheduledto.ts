import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateScheduleDto {
  alerts: Date[];

  @IsString({ message: 'Informe uma descrição valida' })
  description: string;

  @IsNotEmpty({
    message: 'Status não fornecido',
  })
  status: string;

  dateTime: string;
}
