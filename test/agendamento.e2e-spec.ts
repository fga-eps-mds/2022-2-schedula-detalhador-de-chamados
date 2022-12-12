import { IssuesService } from '../src/issues/issues.service';
import { CreateIssuedto } from '../src/issues/dto/createIssuedto';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { IssueModule } from '../src/issues/issue.module';

const teste: CreateIssuedto = {
  dataHora: new Date('2022-12-10T17:55:20.565Z'),
  alertas: [new Date('2022-12-10T17:55:20.565Z')],
  descricao: 'Teste',
  status: 'Aberto',
};

describe('Issues Controller', () => {
  let app: INestApplication;
  let issuesService = { createIssue: () => teste };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [IssueModule],
    })
      .overrideProvider(IssuesService)
      .useValue(issuesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST issue`, () => {
    return request(app.getHttpServer())
      .post('/issue')
      .expect(200)
      .expect({
        data: issuesService.createIssue(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
