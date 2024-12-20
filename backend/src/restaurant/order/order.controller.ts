import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateTableDTO } from '../table/dto/CreateTableDTO';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async submitOrder(@Body() order: CreateTableDTO) {
    return this.orderService.submit(order);
  }

  @Get(':orderId')
  async findOne(@Param('orderId') orderId: string) {
    return this.orderService.findOne(orderId);
  }
  @Get(':tableId')
  async findAll(@Param('tableId') tableId: string) {
    return this.orderService.findAll(tableId);
  }

  @Patch(':orderId')
  async updateOrderStatus(@Param('orderId') orderId: string) {
    return this.orderService.updateOrderStaturs(orderId);
  }

  @Delete(':orderId')
  async cancelOrder(@Param('orderId') orderId: string) {
    return this.orderService.delete(orderId);
  }
}
