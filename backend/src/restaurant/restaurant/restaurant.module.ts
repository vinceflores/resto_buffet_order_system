import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderModule } from 'src/restaurant/order/order.module';
import { TableModule } from 'src/restaurant1/table/table.module';
import { MenuModule } from 'src/restaurant/menu/menu.module';

@Module({
  imports: [PrismaModule, OrderModule, TableModule, MenuModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
