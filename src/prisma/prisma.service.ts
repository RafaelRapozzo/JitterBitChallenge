import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    // Estabelece a ligação ao SQLite ao iniciar o NestJS
    await this.$connect();
  }

  async onModuleDestroy() {
    // Fecha a ligação ao encerrar a aplicação
    await this.$disconnect();
  }
}