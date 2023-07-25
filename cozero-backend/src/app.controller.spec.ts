import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from '@Auth';

describe('AppController', () => {
  let appController: AppController;
  const authServiceMock: Partial<AuthService> = {};
  const appServiceMock: Partial<AppService> = {
    getHello(): string {
      return 'Hello World!';
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .overrideProvider(AppService)
      .useValue(appServiceMock)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello({})).toBe('Hello World!');
    });
  });
});
