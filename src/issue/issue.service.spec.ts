import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateIssuedto } from './dto/createIssuedto';
import { UpdateIssuedto } from './dto/updateIssuedto';
import { Issue } from './issue.entity';
import { IssuesService } from './issue.service';

describe('IssuesService', () => {
  let issuesService: IssuesService;
  let issuesRepository: Repository<Issue>;
  const date = new Date('2022-12-17T17:55:20.565');
  jest.useFakeTimers().setSystemTime(date);

  const mockIssue = {
    requester: 'mockerson',
    phone: '61983445521',
    city: 'Brasilia',
    workstation: 'DF',
    problem_category: 'categoria',
    problem_type: 'type',
    email: 'mockerson@mock.com',
    date: date,
  };

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

  const mockUpdateIssueDto: UpdateIssuedto = {
    requester: 'Mockerson',
    phone: '61988554474',
    city: 'Brasilia',
    workstation: 'DF',
    problem_category: 'New Category Mock',
    problem_type: 'Type Mock',
    date: new Date(),
    email: 'mockerson@mock.com',
  };

  const usersEntityList = [{ ...mockCreateIssuedto }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IssuesService,
        {
          provide: getRepositoryToken(Issue),
          useValue: {
            create: jest.fn().mockResolvedValue(new Issue()),
            find: jest.fn().mockResolvedValue(usersEntityList),
            findOne: jest.fn().mockResolvedValue(usersEntityList[0]),
            findOneBy: jest.fn().mockResolvedValue(usersEntityList[0]),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(mockUpdateIssueDto),
          },
        },
      ],
    }).compile();

    issuesService = module.get<IssuesService>(IssuesService);
    issuesRepository = module.get<Repository<Issue>>(getRepositoryToken(Issue));
  });

  it('should be defined', () => {
    expect(issuesRepository).toBeDefined();
    expect(issuesService).toBeDefined();
  });

  describe('createIssue', () => {
    const dto = mockCreateIssuedto;
    it('should call issue repository with correct params', async () => {
      await issuesService.createIssue(mockIssue);
      expect(issuesRepository.create).toHaveBeenCalledWith({
        ...mockIssue,
        date,
      });
      expect(issuesRepository.create);
    });

    it('should call issue repository save function with correct params', async () => {
      jest.spyOn(issuesRepository, 'create').mockReturnValueOnce({
        ...mockIssue,
        id: '1',
      } as Issue);
      await issuesService.createIssue(mockIssue);
      expect(issuesRepository.save).toHaveBeenCalledWith({
        ...mockIssue,
        id: '1',
      });
    });

    it('should return an internal server error exception when issue cannot be created', async () => {
      jest.spyOn(issuesRepository, 'save').mockRejectedValue(new Error());

      expect(issuesService.createIssue({ ...dto })).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findIssues', () => {
    it('should return a list of issues', async () => {
      const response = await issuesService.findIssues();

      expect(response).toEqual(usersEntityList);
      expect(issuesRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(issuesRepository, 'find').mockResolvedValueOnce(null);

      expect(issuesService.findIssues()).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findIssueById', () => {
    const id = mockUuid;

    it('should return an issue entity successfully', async () => {
      const response = await issuesService.findIssueById(id);

      expect(response).toEqual(usersEntityList[0]);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(issuesRepository, 'findOne').mockResolvedValueOnce(null);

      expect(issuesService.findIssueById(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('updateIssue', () => {
    const id = mockUuid;
    const dto = mockUpdateIssueDto;

    it('should return an updated issue successfully', async () => {
      const response = await issuesService.updateIssue({ ...dto }, id);
      expect(response).toMatchObject({ ...mockUpdateIssueDto });
    });

    it('should return an internal server error exception when issue cannot be updated', async () => {
      jest.spyOn(issuesRepository, 'save').mockRejectedValue(new Error());

      expect(issuesService.updateIssue({ ...dto }, id)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteIssue', () => {
    it('should delete an issue with success', async () => {
      const id = mockUuid;
      await issuesService.deleteIssue(id);
      expect(issuesRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should return a not found exception', () => {
      const id = mockUuid;

      jest
        .spyOn(issuesRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as DeleteResult);

      expect(issuesService.deleteIssue(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
