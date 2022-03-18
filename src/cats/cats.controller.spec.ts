import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatDto } from './dto/cat.dto';
import { CatsService } from './cats.service';
import { CatDoc } from './schemas/cat.schema';

describe('Cats Controller', () => {
  let controller: CatsController;
  let service: CatsService;
  const createCatDto: CatDto = {
    name: 'Cat #1',
    breed: 'Breed #1',
    age: 4,
  };

  const mockCat: Pick<CatDoc, 'name' | 'breed' | 'age' | '_id'> = {
    name: 'Cat #1',
    breed: 'Breed #1',
    age: 4,
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'Cat #1',
                breed: 'Bread #1',
                age: 4,
              },
              {
                name: 'Cat #2',
                breed: 'Breed #2',
                age: 3,
              },
              {
                name: 'Cat #3',
                breed: 'Breed #3',
                age: 2,
              },
            ]),
            create: jest.fn().mockResolvedValue(createCatDto),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  describe('create()', () => {
    it('should create a new cat', async () => {
      const createSpy = jest.spyOn(service, 'create').mockResolvedValueOnce(mockCat as CatDoc);

      await controller.create(createCatDto);
      expect(createSpy).toHaveBeenCalledWith(createCatDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of cats', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'Cat #1',
          breed: 'Bread #1',
          age: 4,
        },
        {
          name: 'Cat #2',
          breed: 'Breed #2',
          age: 3,
        },
        {
          name: 'Cat #3',
          breed: 'Breed #3',
          age: 2,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
