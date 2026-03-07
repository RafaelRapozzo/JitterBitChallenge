import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { OrdersModule } from './orders/orders.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [OrdersModule, PrismaModule],
  controllers: [AppController, OrdersController],
  providers: [AppService, PrismaService, OrdersService],
  exports: [PrismaService],
})
export class AppModule {}
