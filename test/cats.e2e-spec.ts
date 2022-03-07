import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from '../src/cats/cats.module';

describe('AppController (e2e)', () => {
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
      name: `Tom-${Math.floor(Math.random() * 100) + 10}`,
      age: Math.floor(Math.random() * 100) + 10,
      breed: 'gray',
    };
    const response: any = await request(app.getHttpServer())
      .post('/cats')
      .send(mockData)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(201);
  });

  it('Update a cat', async () => {
    const mockData = {
      id: '6225b21ecaf892f8ea4174ef',
      name: `Tom${Math.floor(Math.random() * 100) + 10}`,
      age: Math.floor(Math.random() * 100) + 10,
      breed: 'white',
      tags: ['cute', 'china'],
    };
    const response = await request(app.getHttpServer())
      .put('/cats')
      .send(mockData)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
  });
});
