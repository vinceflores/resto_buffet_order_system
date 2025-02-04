import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClerkModule } from './clerk/clerk.module';
import { PrismaModule } from './prisma/prisma.module';
import { MenuModule } from './restaurant/menu/menu.module';
import { OrderModule } from './restaurant/order/order.module';
import { RestaurantModule } from './restaurant/restaurant/restaurant.module';
import { TableModule } from './restaurant/table/table.module';
import { clerkMiddleware } from '@clerk/express';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(clerkMiddleware()).forRoutes('table');
  }
}
