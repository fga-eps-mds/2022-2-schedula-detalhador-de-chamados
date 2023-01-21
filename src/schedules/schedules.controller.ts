import {
  Body,
  CacheInterceptor,
  ConsoleLogger,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Schedule } from './entities/schedule.entity';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/createScheduledto';
import { UpdateScheduleDto } from './dto/updateScheduledto';

@Controller('schedules')
@UseInterceptors(CacheInterceptor)
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Post()
  async createSchedule(
    @Body() createScheduledto: CreateScheduleDto,
  ): Promise<Schedule> {
    const schedule = await this.schedulesService.createSchedule(
      createScheduledto,
    );
    return schedule;
  }

  @Get()
  async getSchedules(): Promise<Schedule[]> {
    const schedules = await this.schedulesService.findSchedules();
    return schedules;
  }

  @Get(':id')
  async getSchedule(@Param('id') id: string): Promise<Schedule> {
    const schedule = await this.schedulesService.findScheduleById(id);
    return schedule;
  }

  @Put(':id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() updateScheduledto: UpdateScheduleDto,
  ): Promise<Schedule> {
    const schedule = await this.schedulesService.updateSchedule(
      updateScheduledto,
      id,
    );
    return schedule;
  }

  @Delete(':id')
  async deleteSchedule(@Param('id') id: string) {
    await this.schedulesService.deleteSchedule(id);
    return {
      message: 'Agendamento removido com sucesso',
    };
  }
}
