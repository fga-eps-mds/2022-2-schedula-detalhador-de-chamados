import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamento } from './agendamento.entity';
import { Alerta } from './alerta.entity';
import { CreateAgendamentodto } from './dto/createAgendamentodto';

@Injectable()
export class AgendamentosService {
  constructor(
    @InjectRepository(Agendamento)
    private agendamentoRepo: Repository<Agendamento>,
    @InjectRepository(Alerta)
    private alertaRepo: Repository<Alerta>,
  ) {}

  async createAgendamento(
    createAgendamentodto: CreateAgendamentodto,
  ): Promise<Agendamento> {
    const { /*chamado, */ dataHora, alertas, descricao, status } =
      createAgendamentodto;

    const agendamento = this.agendamentoRepo.create();
    //agendamento.chamado = chamado;
    agendamento.alertas = this.createAlerts(alertas);
    agendamento.descricao = descricao;
    agendamento.dataHora = dataHora;
    agendamento.status = status;

    try {
      await agendamento.save();
      return agendamento;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAgendamentos(): Promise<Agendamento[]> {
    const agendamentos = this.agendamentoRepo.find({relations: ["alertas"]});
    if (!agendamentos)
      throw new NotFoundException('Não existem agendamentos cadastrados');
    return agendamentos;
  }

  async findAgendamentoById(agendamentoId: string): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepo.findOne({where:{ id: agendamentoId }, relations: ["alertas"]
    });
    if (!agendamento) throw new NotFoundException('Agendamento não encontrado');
    return agendamento;
  }

  async updateAgendamento(
    createAgendamentodto: CreateAgendamentodto,
    agendamentoId: string,
  ): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepo.findOneBy({
      id: agendamentoId,
    });
    const { /*chamado, */ dataHora, alertas, descricao, status } =
      createAgendamentodto;

    //agendamento.chamado = chamado
    agendamento.alertas = this.createAlerts(alertas);
    agendamento.descricao = descricao;
    agendamento.dataHora = dataHora;
    agendamento.status = status;

    try {
      await this.agendamentoRepo.save(agendamento);
      return agendamento;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteAgendamento(agendamentoId: string) {
    const result = await this.agendamentoRepo.delete({ id: agendamentoId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Nao foi encontrado um agendamento com este id',
      );
    }
  }

  createAlerts(datas: Date[]): Alerta[] {
    var alertas: Alerta[] = [];

    datas.forEach((data) => {
      let alerta = this.alertaRepo.create();
      alerta.date = data;
      alertas.push(alerta);
    });

    return alertas;
  }
}
