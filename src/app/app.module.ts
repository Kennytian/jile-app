import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from '../cats/cats.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/jile-app', { retryDelay: 5 }), CatsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
