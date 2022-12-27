//import {CreateCalldto} from '../calls/createCalldto';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
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
