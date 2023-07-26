import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { RepositoryMock, repositoryMockFactory } from '@Test/util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from '@Auth/auth.service';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: RepositoryMock;
  const authServiceMock: Partial<AuthService> = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    })
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
