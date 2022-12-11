import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Scheduling } from './scheduling.entity';
import { SchedulingsService } from './schedulings.service';
import { CreateSchedulingDto } from './dto/createSchedulingdto';

@Controller('schedulings')
export class SchedulingsController {
  constructor(private schedulingsService: SchedulingsService) {}

  @Post()
  async createScheduling(
    @Body() createSchedulingdto: CreateSchedulingDto,
  ): Promise<Scheduling> {
    const scheduling = await this.schedulingsService.createScheduling(
      createSchedulingdto,
    );
    return scheduling;
  }

  @Get()
  async getSchedulings(): Promise<Scheduling[]> {
    const schedulings = await this.schedulingsService.findSchedulings();
    return schedulings;
  }

  @Get(':id')
  async getScheduling(@Param('id') id: string): Promise<Scheduling> {
    const scheduling = await this.schedulingsService.findSchedulingById(id);
    return scheduling;
  }

  @Put(':id')
  async updateScheduling(
    @Param('id') id: string,
    @Body() updateSchedulingdto: CreateSchedulingDto,
  ): Promise<Scheduling> {
    const scheduling = await this.schedulingsService.updateScheduling(
      updateSchedulingdto,
      id,
    );
    return scheduling;
  }

  @Delete(':id')
  async deleteScheduling(@Param('id') id: string) {
    const scheduling = await this.schedulingsService.deleteScheduling(id);
    return {
      message: 'Scheduling removido com sucesso',
    };
  }
}
