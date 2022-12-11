import { SchedulingsService } from '../src/schedulings/schedulings.service';
import { CreateSchedulingDto } from '../src/schedulings/dto/createSchedulingdto';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { SchedulingModule } from '../src/schedulings/scheduling.module';

const teste: CreateSchedulingDto = {
  dateTime: new Date('2022-12-10T17:55:20.565Z'),
  alerts: [new Date('2022-12-10T17:55:20.565Z')],
  description: 'Teste',
  status: 'Aberto',
};

describe('Schedulings Controller', () => {
  let app: INestApplication;
  let schedulingsService = { createScheduling: () => teste };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SchedulingModule],
    })
      .overrideProvider(SchedulingsService)
      .useValue(schedulingsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST scheduling`, () => {
    return request(app.getHttpServer()).post('/scheduling').expect(200).expect({
      data: schedulingsService.createScheduling(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
