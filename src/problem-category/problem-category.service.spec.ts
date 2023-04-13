import { CreateProblemCategoryDto } from './dto/create-problem-category.dto';
import { UpdateProblemCategoryDto } from './dto/update-problem-category.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { ProblemCategoryService } from './problem-category.service';
import { ProblemCategory } from './entities/problem-category.entity';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProblemTypesService } from '../problem-types/problem-types.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('ProblemCategoryService', () => {
  let service: ProblemCategoryService;
  let repo: Repository<ProblemCategory>;

  const mockUuid = uuid();

  const mockProblemType = {
    name: 'mock',
  };

  const mockCreateProblemCategoryDto: CreateProblemCategoryDto = {
    name: 'mockName',
    description: 'mockDescription',
    problem_types_ids: ['mockProblemType1', 'mockProblemType2'],
  };

  const mockUpdateProblemCategoryDto: UpdateProblemCategoryDto = {
    name: 'UpdateMockName',
    description: 'mockDescription',
    problem_types_ids: ['mockProblemType1', 'mockProblemType2'],
  };

  const mockProblemCategoryEntityList = [{ ...mockCreateProblemCategoryDto }];

  const mockProblemCategoryRepository = {
    create: jest.fn().mockResolvedValue(new ProblemCategory()),
    find: jest.fn().mockResolvedValue(mockProblemCategoryEntityList),
    findOne: jest.fn().mockResolvedValue(mockProblemCategoryEntityList[0]),
    findOneBy: jest.fn().mockResolvedValue(mockProblemCategoryEntityList[0]),
    softRemove: jest.fn(),
    save: jest.fn(),
  };

  const mockProblemTypeService = {
    findAll: jest.fn().mockResolvedValue([{ ...mockProblemType }]),
    findProblemType: jest.fn().mockResolvedValue(mockProblemType),
    createProblemType: jest.fn().mockResolvedValue(mockProblemType),
    updateProblemType: jest.fn().mockResolvedValue(mockProblemType),
    deleteProblemType: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemCategoryService,
        {
          provide: getRepositoryToken(ProblemCategory),
          useValue: mockProblemCategoryRepository,
        },
        {
          provide: ProblemTypesService,
          useValue: mockProblemTypeService,
        },
      ],
    }).compile();

    service = module.get<ProblemCategoryService>(ProblemCategoryService);
    repo = module.get<Repository<ProblemCategory>>(
      getRepositoryToken(ProblemCategory),
    );
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('CreateProblemCategory', () => {
    it('should return a problem category entity succesfully', async () => {
      await service.createProblemCategory(mockCreateProblemCategoryDto);
      expect(repo.create);
    });

    it('should throw an internal server error', async () => {
      jest.spyOn(repo, 'save').mockRejectedValueOnce(new Error());
      expect(
        service.createProblemCategory(mockCreateProblemCategoryDto),
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('findProblemCategories', () => {
    it('should return an array of problem category entities succesfully', async () => {
      const result = await service.findProblemCategories();
      expect(result).toEqual(mockProblemCategoryEntityList);
      expect(repo.find).toHaveBeenCalledTimes(1);
    });
    it('should throw a not found exception', async () => {
      jest.spyOn(repo, 'find').mockResolvedValueOnce([]);
      expect(service.findProblemCategories()).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findProblemCategoryById', () => {
    it('should return a problem category entity succesfully', async () => {
      const id = mockUuid;
      const result = await service.findProblemCategoryById(id);
      expect(result).toEqual(mockProblemCategoryEntityList[0]);
      expect(repo.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
      expect(service.findProblemCategoryById(mockUuid)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('updateProblemCategory', () => {
    it('should update a problem category successfully', async () => {
      const result = await service.updateProblemCategory(
        mockUuid,
        mockUpdateProblemCategoryDto,
      );

      expect(result).toEqual(mockProblemCategoryEntityList[0]);
    });

    it('should throw an internal server error', async () => {
      jest.spyOn(repo, 'save').mockRejectedValueOnce(new Error());
      expect(
        service.updateProblemCategory(mockUuid, mockUpdateProblemCategoryDto),
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('deleteProblemCategory', () => {
    it('should throw a not found exception', async () => {
      const id = mockUuid;

      jest.spyOn(repo, 'softRemove').mockResolvedValue(null);

      expect(service.deleteProblemCategory(id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
