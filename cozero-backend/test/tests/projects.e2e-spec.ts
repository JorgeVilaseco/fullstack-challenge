import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import {
  inactiveProjectsExpectedResults,
  searchExpectedResult,
} from '../data/projects.data';
import { AppModule } from '../../src/app.module';
import { JwtAuthGuard } from '@Auth/jwt-auth.guard';
import { MockAuthGuard } from '../util/mock-auth.util';

describe('ProjectsController (e2e)', () => {
  const baseUrl = '/projects';
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) /search', () => {
    return request(app.getHttpServer())
      .get(`${baseUrl}/search?queryParam=lorem&page=0&pageSize=15`)
      .expect(200)
      .expect(searchExpectedResult);
  });
  it('/ (GET) /inactive', () => {
    return request(app.getHttpServer())
      .get(`${baseUrl}/inactive?page=0&pageSize=15`)
      .expect(200)
      .expect(inactiveProjectsExpectedResults);
  });
  it('/ (PUT) /:id (reinstate project)', () => {
    return request(app.getHttpServer()).get(`${baseUrl}/19`).expect(200);
  });
});
