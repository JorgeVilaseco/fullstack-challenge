import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { searchExpectedResult } from '@Test/data';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  const projectServiceMock: Partial<ProjectsService> = {
    searchByTitleDesc = (text, page, pageSize) => {
      return searchExpectedResult;
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
  it('should be defined', () => {
    const text = 'Lorem';
    const page = 0;
    const pageSize = 10;
    expect(controller.search(text, page, pageSize)).toBe(searchExpectedResult);
  });
});
