import { Test, TestingModule } from '@nestjs/testing';
import { IssuesController } from './issue.controller';
import { IssuesService } from './issue.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateIssuedto } from './dto/createIssuedto';

describe('IssuesController', () => {
  let controller: IssuesController;

  const mockUuid = uuidv4();

  const mockCreateIssuedto: CreateIssuedto = {
    requester: 'Mockerson',
    phone: '61988554474',
    city: 'Brasilia',
    workstation: 'DF',
    problem_category: 'Category Mock',
    problem_type: 'Type Mock',
    date: new Date(),
    email: 'mockerson@mock.com',
  };

  const mockUpdateissueDto: CreateIssuedto = {
    requester: 'Mockerson',
    phone: '61988554474',
    city: 'Brasilia',
    workstation: 'DF',
    problem_category: 'New Category Mock',
    problem_type: 'Type Mock',
    date: new Date(),
    email: 'mockerson@mock.com',
  };

  const mockIssuesService = {
    createIssue: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    findIssues: jest.fn(() => {
      return [{ ...mockCreateIssuedto }];
    }),
    findIssueById: jest.fn((id) => {
      return {
        id,
        ...mockCreateIssuedto,
      };
    }),
    updateIssue: jest.fn((dto, id) => {
      return {
        ...dto,
        id,
      };
    }),
    deleteIssue: jest.fn((id) => {
      return {
        message: 'Chamado removido com sucesso',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssuesController],
      providers: [IssuesService],
    })
      .overrideProvider(IssuesService)
      .useValue(mockIssuesService)
      .compile();

    controller = module.get<IssuesController>(IssuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a issue', async () => {
    const dto = mockCreateIssuedto;
    const response = await controller.createIssue(dto);
    expect(response).toMatchObject({ ...dto });
  });

  it('should return all issues', async () => {
    const response = await controller.getIssues();
    expect(response.length).toBeGreaterThan(0);
    expect(response).toEqual([{ ...mockCreateIssuedto }]);
  });

  it('should return a issue with the respective id', async () => {
    const issueId = mockUuid;
    const response = await controller.getIssue(issueId);
    expect(response).toMatchObject({ id: issueId });
  });

  it('should update a issue', async () => {
    const issueId = mockUuid;
    const dto = mockUpdateissueDto;
    const response = await controller.updateIssue(issueId, dto);
    expect(response).toMatchObject({ id: issueId, ...dto });
  });

  it('should delete a issue', async () => {
    const issueId = mockUuid;
    const successMessage = 'Chamado removido com sucesso';
    const response = await controller.deleteIssue(issueId);
    expect(response).toMatchObject({ message: successMessage });
  });
});
