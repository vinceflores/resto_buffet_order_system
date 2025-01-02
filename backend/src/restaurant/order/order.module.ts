import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderGateway } from './order.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [OrderService, OrderGateway],
  exports: [OrderService],
})
export class OrderModule {}
