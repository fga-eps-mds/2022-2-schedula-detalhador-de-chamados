//o commit aterior não foi os dois co-authors
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scheduling } from './scheduling.entity';
import { Alert } from './alert.entity';
import { CreateSchedulingDto } from './dto/createSchedulingdto';

@Injectable()
export class SchedulingsService {
  constructor(
    @InjectRepository(Scheduling)
    private schedulingRepo: Repository<Scheduling>,
    @InjectRepository(Scheduling)
    private alertRepo: Repository<Alert>,
  ) {}

  async createScheduling(
    createSchedulingdto: CreateSchedulingDto,
  ): Promise<Scheduling> {
    const { /*chamado, */ dateTime, alerts, description, status } =
      createSchedulingdto;

    const scheduling = this.schedulingRepo.create();
    //scheduling.chamado = chamado;
    scheduling.alerts = this.createAlerts(alerts);
    scheduling.description = description;
    scheduling.dateTime = dateTime;
    scheduling.status = status;

    try {
      await scheduling.save();
      return scheduling;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findSchedulings(): Promise<Scheduling[]> {
    const schedulings = this.schedulingRepo.find({ relations: ['alerts'] });
    if (!schedulings)
      throw new NotFoundException('Não existem agendamentos cadastrados');
    return schedulings;
  }

  async findSchedulingById(schedulingId: string): Promise<Scheduling> {
    const scheduling = await this.schedulingRepo.findOne({
      where: { id: schedulingId },
      relations: ['alerts'],
    });
    if (!scheduling) throw new NotFoundException('Agendamento não encontrado');
    return scheduling;
  }

  async updateScheduling(
    createSchedulingdto: CreateSchedulingDto,
    schedulingId: string,
  ): Promise<Scheduling> {
    const scheduling = await this.schedulingRepo.findOneBy({
      id: schedulingId,
    });
    const { /*chamado, */ dateTime, alerts, description, status } =
      createSchedulingdto;

    //scheduling.chamado = chamado
    scheduling.alerts = this.createAlerts(alerts);
    scheduling.description = description;
    scheduling.dateTime = dateTime;
    scheduling.status = status;

    try {
      await this.schedulingRepo.save(scheduling);
      return scheduling;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteScheduling(schedulingId: string) {
    const result = await this.schedulingRepo.delete({ id: schedulingId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Nao foi encontrado um agendamento com este id',
      );
    }
  }

  createAlerts(datas: Date[]): Alert[] {
    var alerts: Alert[] = [];

    datas.forEach((data) => {
      let alert = this.alertRepo.create();
      alert.date = data;
      alerts.push(alert);
    });

    return alerts;
  }
}
