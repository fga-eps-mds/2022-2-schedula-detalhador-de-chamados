import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { SchedulesService } from './schedules.service';
import { Schedule } from './schedule.entity';
import { CreateScheduleDto } from './dto/createScheduledto';
import { UpdateScheduleDto } from './dto/updateScheduledto';
import { IssuesService } from '../issue/issue.service';
import { Issue } from '../issue/issue.entity';
import { Alert } from './alert.entity';

describe('SchedulesService', () => {
  let schedulesService: SchedulesService;
  let schedulesRepository: Repository<Schedule>;

  const mockUuid = uuid();

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
    dateTime: '2022-12-18T18:55:20.565',
  };
  const schedulesEntityList = [
    { ...mockCreateScheduleDto, ...mockUpdateScheduleDto },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        IssuesService,
        {
          provide: getRepositoryToken(Schedule),
          useValue: {
            create: jest.fn().mockResolvedValue(new Schedule()),
            find: jest.fn().mockResolvedValue(schedulesEntityList),
            findOne: jest.fn().mockResolvedValue(schedulesEntityList[0]),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    schedulesService = module.get<SchedulesService>(SchedulesService);
    schedulesRepository = module.get<Repository<Schedule>>(
      getRepositoryToken(Schedule),
    );
  });

  it('should be defined', () => {
    expect(schedulesService).toBeDefined();
    expect(schedulesRepository).toBeDefined();
  });

  describe('findSchedules', () => {
    it('should return a schedule entity list successfully', async () => {
      const response = await schedulesService.findSchedules();

      expect(response).toEqual(schedulesEntityList);
      expect(schedulesRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(schedulesRepository, 'find').mockResolvedValueOnce(null);

      expect(schedulesService.findSchedules()).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findScheduleById', () => {
    const id = mockUuid;

    it('should return a schedule entity successfully', async () => {
      const response = await schedulesService.findScheduleById(id);

      expect(response).toEqual(schedulesEntityList[0]);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(schedulesRepository, 'findOne').mockResolvedValueOnce(null);

      expect(schedulesService.findScheduleById(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('deleteSchedule', () => {
    it('should return a not found exception', () => {
      const id = mockUuid;

      jest.spyOn(schedulesRepository, 'delete').mockResolvedValue(null);
      expect(schedulesService.deleteSchedule(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
