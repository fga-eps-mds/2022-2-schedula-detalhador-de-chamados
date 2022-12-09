//Import dos dtos de chamados ainda não criados
//import {CreateChamadodto} from '../chamados/chamadosdto.ts';

export class CreateAgendamentodto{
    //chamado : CreateChamadodto;
    dataEHora : Date;
    alertas : Date[];
    descricao : string;
    status : string;
}