//Import dos dtos de chamados ainda não criados
//import {CreateChamadodto} from '../chamados/chamadosdto.ts';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchedulingDto {
  //chamado : CreateChamadodto;

  dateTime: Date;

  alerts: Date[];

  @IsString({ message: 'Informe uma descrição valida' })
  description: string;

  @IsNotEmpty({
    message: 'Status não fornecido',
  })
  status: string;
}
