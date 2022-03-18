import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatDoc, CatSchema } from './schemas/cat.schema';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: CatDoc.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
