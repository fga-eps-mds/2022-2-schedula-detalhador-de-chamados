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
import { ScheduleStatus } from './schedule-status.enum';
import { IssuesService } from '../issue/issue.service';
import { UpdateScheduleDto } from './dto/updateScheduledto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
    @InjectRepository(Schedule)
    private alertRepo: Repository<Alert>,
    private issuesService: IssuesService,
  ) {}

  async createSchedule(
    createScheduledto: CreateScheduleDto,
  ): Promise<Schedule> {
    const {
      requester,
      city,
      phone,
      workstation,
      problem_category,
      problem_type,
      description,
      attendant_email,
      alerts,
      status,
    } = createScheduledto;

    try {
      const issue = await this.issuesService.createIssue({
        requester,
        city,
        phone,
        workstation,
        problem_category,
        problem_type,
        date: new Date(),
        email: attendant_email,
      });
      const schedule = this.scheduleRepo.create();

      schedule.issue = issue;
      schedule.alerts = this.createAlerts(alerts);
      schedule.description = description;
      schedule.dateTime = issue.date;
      schedule.status = ScheduleStatus[status];

      await schedule.save();
      return schedule;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findSchedules(): Promise<Schedule[]> {
    const schedules = this.scheduleRepo.find({
      relations: ['alerts', 'issue'],
    });
    if (!schedules)
      throw new NotFoundException('Não existem agendamentos cadastrados');
    return schedules;
  }

  async findScheduleById(scheduleId: string): Promise<Schedule> {
    const schedule = await this.scheduleRepo.findOne({
      where: { id: scheduleId },
      relations: ['alerts'],
    });
    if (!schedule) throw new NotFoundException('Agendamento não encontrado');
    return schedule;
  }

  async updateSchedule(
    updateScheduledto: UpdateScheduleDto,
    scheduleId: string,
  ): Promise<Schedule> {
    const schedule = await this.scheduleRepo.findOneBy({
      id: scheduleId,
    });
    const { description, alerts, status, dateTime } = updateScheduledto;

    try {
      schedule.alerts = alerts ? this.createAlerts(alerts) : schedule.alerts;
      schedule.description = description;
      schedule.dateTime = dateTime ? new Date(dateTime) : schedule.dateTime;
      schedule.status = ScheduleStatus[status];

      await this.scheduleRepo.save(schedule);
      return schedule;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteSchedule(scheduleId: string) {
    const result = await this.scheduleRepo.delete({ id: scheduleId });
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
