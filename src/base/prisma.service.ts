import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Connect to the database when the module is initialized.
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  /**
   * Disconnect from the database when the application is shutting down.
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  /**
   * A utility function used to clear all database rows for testing.
   */
  clearDatabase(): Promise<void[]> {
    const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);

    return Promise.all(modelNames.map((modelName) => this[modelName[0].toLowerCase() + modelName.slice(1)].deleteMany()));
  }
}
