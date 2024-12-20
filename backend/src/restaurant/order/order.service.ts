import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async submit(order: any) {
    return await this.prisma.order.create({
      data: order,
    });
  }

  async findOne(orderId: string) {
    return await this.prisma.order.findUnique({
      where: { id: orderId },
    });
  }

  async findAll(tableId: string) {
    return await this.prisma.order.findMany({
      where: { tableId },
    });
  }

  async updateOrderStaturs(orderId: string) {
    return await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'IN_PROGRESS', // You may want to accept status as parameter
      },
    });
  }

  async delete(orderId: string) {
    return await this.prisma.order.delete({
      where: { id: orderId },
    });
  }
}
