import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import {
  inactiveProjectsExpectedResults,
  searchExpectedResult,
} from '../data/projects.data';
import { AppModule } from '../../src/app.module';

describe('ProjectsController (e2e)', () => {
  const baseUrl = '/projects';
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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
      .get(`${baseUrl}/inactive?owner=test@cozero.dev&page=0&pageSize=15`)
      .expect(200)
      .expect(inactiveProjectsExpectedResults);
  });
});
