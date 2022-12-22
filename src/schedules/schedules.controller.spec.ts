import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateScheduleDto } from './dto/createScheduledto';

describe('SchedulesController', () => {
  let controller: SchedulesController;

  const mockUuid = uuidv4();

  const mockCreateScheduleDto: CreateScheduleDto = {
    dateTime: new Date('2022-12-17T17:55:20.565'),
    alerts: [
      new Date('2022-12-17T17:55:20.565'),
      new Date('2022-12-18T18:55:20.565'),
    ],
    description: 'Uma descrição valida',
    status: 'Em andamento',
  };

  const mockUpdateScheduleDto: CreateScheduleDto = {
    dateTime: new Date('2022-12-17T17:55:20.565'),
    alerts: [
      new Date('2022-12-17T17:55:20.565'),
      new Date('2022-12-18T18:55:20.565'),
    ],
    description: 'Outra descrição valida',
    status: 'Concluido',
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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [SchedulesService],
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
});
