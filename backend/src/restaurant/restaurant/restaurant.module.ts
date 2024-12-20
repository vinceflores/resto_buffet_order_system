import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderModule } from 'src/restaurant/order/order.module';

import { MenuModule } from 'src/restaurant/menu/menu.module';
import { TableModule } from '../table/table.module';

@Module({
  imports: [PrismaModule, OrderModule, TableModule, MenuModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
