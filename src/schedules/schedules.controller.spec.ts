import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateScheduleDto } from './dto/createScheduledto';
import { UpdateScheduleDto } from './dto/updateScheduledto';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';

describe('SchedulesController', () => {
  let controller: SchedulesController;

  const mockUuid = uuidv4();

  const mockCreateScheduleDto: CreateScheduleDto = {
    requester: 'mockerson',
    phone: '62911111111',
    city: 'Trindade',
    workstation: 'GO',
    problem_category: 'category',
    problem_type: 'type',
    attendant_email: 'attendant@mail.com',
    alerts: [
      new Date('2022-12-17T17:55:20.565'),
      new Date('2022-12-18T18:55:20.565'),
    ],
    description: 'Uma descrição valida',
    status: 'PROGRESS',
  };

  const mockUpdateScheduleDto: UpdateScheduleDto = {
    description: 'Outra descrição valida',
    status: 'CLOSED',
    alerts: [new Date('2022-12-19T19:55:20.565')],
    dateTime: '2022-13-18T18:55:20.565',
  };

  const mockSchedulesService = {
    createSchedule: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    findSchedules: jest.fn(() => {
      return [{ ...mockCreateScheduleDto }];
    }),
    findScheduleById: jest.fn((id) => {
      return {
        id,
        ...mockCreateScheduleDto,
      };
    }),
    updateSchedule: jest.fn((dto, id) => {
      return {
        ...dto,
        id,
      };
    }),
    deleteSchedule: jest.fn((id) => {
      return {
        message: 'Agendamento removido com sucesso',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [SchedulesService],
      imports: [CacheModule.register()],
    })
      .overrideProvider(SchedulesService)
      .useValue(mockSchedulesService)
      .compile();

    controller = module.get<SchedulesController>(SchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a schedule', async () => {
    const dto = mockCreateScheduleDto;
    const response = await controller.createSchedule(dto);
    expect(response).toMatchObject({ ...dto });
  });

  it('should return all schedules', async () => {
    const response = await controller.getSchedules();
    expect(response.length).toBeGreaterThan(0);
    expect(response).toEqual([{ ...mockCreateScheduleDto }]);
  });

  it('should return a schedule with the respective id', async () => {
    const scheduleId = mockUuid;
    const response = await controller.getSchedule(scheduleId);
    expect(response).toMatchObject({ id: scheduleId });
  });

  it('should update a schedule', async () => {
    const scheduleId = mockUuid;
    const dto = mockUpdateScheduleDto;
    const response = await controller.updateSchedule(scheduleId, dto);
    expect(response).toMatchObject({ id: scheduleId, ...dto });
  });

  it('should delete a schedule', async () => {
    const scheduleId = mockUuid;
    const successMessage = 'Agendamento removido com sucesso';
    const response = await controller.deleteSchedule(scheduleId);
    expect(response).toMatchObject({ message: successMessage });
  });
});
