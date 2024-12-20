import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenGateway } from './kitchen.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderModule } from 'src/restaurant/order/order.module';
import { TableModule } from 'src/restaurant/table/table.module';

@Module({
  imports: [PrismaModule, OrderModule, TableModule],
  providers: [KitchenGateway, KitchenService],
})
export class KitchenModule {}
