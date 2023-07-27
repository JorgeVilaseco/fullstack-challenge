import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import {
  inactiveProjectsExpectedResults,
  searchExpectedResult,
} from '@Test/data';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from '@Entities/project';

describe('ProjectsController - ', () => {
  let controller: ProjectsController;
  const projectServiceMock: Partial<ProjectsService> = {
    searchByTitleDesc: (text, page, pageSize) => {
      return new Promise((resolve) => resolve(searchExpectedResult));
    },
    getInactiveProjects: (text, page, pageSize) => {
      return new Promise((resolve) => resolve(inactiveProjectsExpectedResults));
    },
    reinstateProject: (owner, projectId) => {
      return new Promise((resolve) => resolve());
    },
    create: (data) => {
      const result: Project = {
        ...data,
        isActive: true,
        createdAt: 'date',
        updatedAt: 'date',
        id: 1,
        deletedAt: null,
      };
      return new Promise((resolve) => resolve(result));
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ProjectsService],
    })
      .overrideProvider(ProjectsService)
      .useValue(projectServiceMock)
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Search - ', () => {
    it('should return all the matched projects without changes', () => {
      const text = 'Lorem';
      const page = 0;
      const pageSize = 10;
      expect(controller.search(text, page, pageSize)).resolves.toBe(
        searchExpectedResult,
      );
    });
  });
  describe('Create - ', () => {
    it('should join the user from the request to the DTO', () => {
      const request = {
        user: { email: 'test@cozero.dev' },
      };
      const requestBody: CreateProjectDto = {
        name: 'test',
        description: 'test',
        co2EstimateReduction: ['0', '1'],
        listing: [],
        owner: undefined,
      };
      expect(controller.create(requestBody, request)).resolves.toHaveProperty(
        'owner',
        request.user.email,
      );
    });
  });
  describe('Get Inactive - ', () => {
    it('should return all inactive projects related to a user projects without changes', () => {
      const page = 0;
      const pageSize = 10;
      const request = {
        user: { email: 'test@cozero.dev' },
      };
      expect(controller.getInactives(page, pageSize, request)).resolves.toBe(
        inactiveProjectsExpectedResults,
      );
    });
  });
  describe('PUT Reinstate - ', () => {
    it('should get to user from the request', () => {
      const projectId = '19';
      const request = {
        user: { email: 'test@cozero.dev' },
      };
      expect(controller.reinstate(projectId, request)).resolves.toBe(
        inactiveProjectsExpectedResults,
      );
    });
  });
});
