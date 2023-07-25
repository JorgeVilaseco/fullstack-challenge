import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { RepositoryMock, repositoryMockFactory } from '@Test/util';
import { searchExpectedResult } from '@Test/data';
import { Like } from 'typeorm';

describe('ProjectsService - ', () => {
  let service: ProjectsService;
  let repositoryMock: RepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repositoryMock = module.get(getRepositoryToken(Project));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchByTitleDesc - ', () => {
    it('return the correct projects from the DB', () => {
      repositoryMock.find.mockReturnValue(searchExpectedResult);
      const text = 'Lorem';
      const page = 0;
      const pageSize = 10;
      expect(service.searchByTitleDesc(text, page, pageSize)).toBe(
        searchExpectedResult,
      );
      expect(repositoryMock.find).toHaveBeenCalledWith({
        where: [
          { name: Like(`%${text}%`) },
          { description: Like(`%${text}%`) },
        ],
      });
    });
  });
});
