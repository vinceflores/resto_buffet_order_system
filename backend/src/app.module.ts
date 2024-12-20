import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { ClerkModule } from './clerk/clerk.module';
import { RestaurantModule } from './restaurant/restaurant/restaurant.module';
import { TableModule } from './restaurant/table/table.module';
import { MenuModule } from './restaurant/menu/menu.module';
import { OrderModule } from './restaurant/order/order.module';
import { KitchenModule } from './restaurant/kitchen/kitchen.module';

dotenv.config({ path: process.cwd() });
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // so that other modules are not required to import ConfigModule
    }),
    PrismaModule,
    ClerkModule,
    RestaurantModule,
    TableModule,
    MenuModule,
    OrderModule,
    KitchenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
