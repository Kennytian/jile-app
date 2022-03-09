import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from '../src/cats/cats.module';

describe('CatsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/jile-app'),
        CatsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get all cats', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect((res: any) => {
        Array.isArray(res);
      });
  });

  it('Create a cat', async () => {
    const mockData = {
      name: `Jerry-${Math.floor(Math.random() * 100) + 10}`,
      age: Math.floor(Math.random() * 100) + 10,
      breed: 'brown',
    };
    const response: any = await request(app.getHttpServer())
      .post('/cats')
      .set('Accept', 'application/json')
      .send(mockData);
    expect(response.status).toEqual(201);
  });

  it('Update a cat', async () => {
    const mockData = {
      id: '62270f419b073fceb5160687',
      name: `Tom-${Math.floor(Math.random() * 100) + 10}`,
      age: Math.floor(Math.random() * 100) + 10,
      breed: 'white',
      tags: ['cute', 'China'],
    };
    const response = await request(app.getHttpServer())
      .put(`/cats/${mockData.id}`)
      .set('Accept', 'application/json')
      .send(mockData);
    expect(response.status).toEqual(200);
  });

  it('Delete a cat', async () => {
    const mockData = {
      id: '62270f803538f9c7bc642d07',
    };
    const response = await request(app.getHttpServer())
      .delete(`/cats/${mockData.id}`)
      .send(mockData);
    expect(response.status).toEqual(200);
  });
});
