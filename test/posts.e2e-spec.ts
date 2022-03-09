import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from '../src/post/posts.module';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/jile-app'),
        PostsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get all posts', async () => {
    const response: any = await request(app.getHttpServer())
      .get('/posts')
      .set('Accept', 'application/json');
    expect(Array.isArray(response.body));
    expect(response.status).toEqual(200);
  });

  it('Create a post', async () => {
    const randomNum = Math.floor(Math.random() * 100) + 10;
    const mockData = {
      title: `post title-${randomNum}`,
      content: `The post content-${randomNum}`,
    };
    const response: any = await request(app.getHttpServer())
      .post('/posts')
      .send(mockData)
      .set('Accept', 'application/json');
    expect(response.body).toMatchObject(mockData);
    expect(response.text).toMatch(/content/g);
    expect(response.status).toEqual(201);
  });

  it('Update a post', async () => {
    const randomNum = Math.floor(Math.random() * 100) + 10;
    const mockData = {
      id: '622755667957dc98ba9b96bd',
      title: `post title-${randomNum}`,
      content: `The post content-${randomNum}`,
    };
    const response = await request(app.getHttpServer())
      .put(`/posts/${mockData.id}`)
      .send(mockData)
      .set('Accept', 'application/json');
    expect(response.body).toMatchObject({});
    expect(response.status).toEqual(200);
  });
});
