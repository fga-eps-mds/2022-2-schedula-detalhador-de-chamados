//Import dos dtos de chamados ainda não criados
//import {CreateChamadodto} from '../chamados/chamadosdto.ts';

import { Agendamento } from "./agendamento.entity";

export class CreateAgendamentodto{
    //chamado : CreateChamadodto;
    dataEHora : Date;
    alertas : Date[];
    descricao : string;
}

export class ReturnAgendamentodto{
    agendamento: Agendamento;
    message: string;
}