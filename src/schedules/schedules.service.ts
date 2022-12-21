//o commit aterior não foi os dois co-authors
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Alert } from './alert.entity';
import { CreateScheduleDto } from './dto/createScheduledto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
    @InjectRepository(Schedule)
    private alertRepo: Repository<Alert>,
  ) {}

  async createSchedule(
    createScheduledto: CreateScheduleDto,
  ): Promise<Schedule> {
    const { /*chamado, */ dateTime, alerts, description, status } =
      createScheduledto;

    const schedule = this.scheduleRepo.create();
    //schedule.chamado = chamado;
    schedule.alerts = this.createAlerts(alerts);
    schedule.description = description;
    schedule.dateTime = dateTime;
    schedule.status = status;

    try {
      await schedule.save();
      return schedule;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findSchedules(): Promise<Schedule[]> {
    const schedules = await this.scheduleRepo.find({ relations: ['alerts'] });
    if (!schedules)
      throw new NotFoundException('Não existem agendamentos cadastrados');
    return schedules;
  }

  async findScheduleById(scheduleId: string): Promise<Schedule> {
    console.log(scheduleId);
    const schedule = await this.scheduleRepo.findOne({
      where: { id: scheduleId },
      relations: ['alerts'],
    });
    if (!schedule) throw new NotFoundException('Agendamento não encontrado');
    return schedule;
  }

  async updateSchedule(
    createScheduledto: CreateScheduleDto,
    scheduleId: string,
  ): Promise<Schedule> {
    const schedule = await this.scheduleRepo.findOneBy({
      id: scheduleId,
    });
    const { /*chamado, */ dateTime, alerts, description, status } =
      createScheduledto;

    //schedule.chamado = chamado
    schedule.alerts = this.createAlerts(alerts);
    schedule.description = description;
    schedule.dateTime = dateTime;
    schedule.status = status;

    try {
      await this.scheduleRepo.save(schedule);
      return schedule;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteSchedule(scheduleId: string) {
    const result = await this.scheduleRepo.delete({ id: scheduleId });
    if (!result) throw new NotFoundException('Usuário não encontrado');
    if (result.affected === 0) {
      throw new NotFoundException(
        'Nao foi encontrado um agendamento com este id',
      );
    }
  }

  createAlerts(dates: Date[]): Alert[] {
    const alerts: Alert[] = [];

    dates.forEach((date) => {
      const alert = this.alertRepo.create();
      alert.date = date;
      alerts.push(alert);
    });

    return alerts;
  }
}
