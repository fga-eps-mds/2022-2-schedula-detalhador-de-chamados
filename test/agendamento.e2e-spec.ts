import { SchedulesService } from '../src/schedules/schedules.service';
import { CreateScheduleDto } from '../src/schedules/dto/createScheduledto';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ScheduleModule } from '../src/schedules/schedule.module';

const teste: CreateScheduleDto = {
  dateTime: new Date('2022-12-10T17:55:20.565Z'),
  alerts: [new Date('2022-12-10T17:55:20.565Z')],
  description: 'Teste',
  status: 'Aberto',
};

describe('Schedules Controller', () => {
  let app: INestApplication;
  let schedulesService = { createSchedule: () => teste };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ScheduleModule],
    })
      .overrideProvider(SchedulesService)
      .useValue(schedulesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST schedule`, () => {
    return request(app.getHttpServer()).post('/schedule').expect(200).expect({
      data: schedulesService.createSchedule(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
