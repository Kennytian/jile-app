import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { APP_PORT, APP_TITLE } from './config/dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle(APP_TITLE).addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(APP_PORT);
  console.log(`api service listening at http://127.0.0.1:${APP_PORT}, the time now: ${new Date().toLocaleString()}, NODE_ENV: ${process.env.NODE_ENV}`);
}
bootstrap();
