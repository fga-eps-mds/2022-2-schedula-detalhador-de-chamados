//Import dos dtos de chamados ainda não criados
//import {CreateChamadodto} from '../chamados/chamadosdto.ts';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgendamentodto {
  //chamado : CreateChamadodto;

  dataHora: Date;

  alertas: Date[];

  @IsString({ message: 'Informe uma descrição valida' })
  descricao: string;

  @IsNotEmpty({
    message: 'Status não fornecido',
  })
  status: string;
}
