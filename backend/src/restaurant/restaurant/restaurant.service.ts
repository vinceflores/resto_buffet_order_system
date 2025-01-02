import { Injectable } from '@nestjs/common';
import { MenuService } from 'src/restaurant/menu/menu.service';
import { OrderService } from 'src/restaurant/order/order.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/CreateRestaurantDto';
import { ReadRestaurantDto } from './dto/ReadRestaurantDto';

@Injectable()
export class RestaurantService {
  constructor(
    private prisma: PrismaService,
    private orderService: OrderService,
    private menuService: MenuService,
  ) {}

  async create(data: CreateRestaurantDto) {
    const { location, clerkId, ...restData } = data;
    const user = await this.prisma.user.findFirst({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) return null;

    return await this.prisma.restaurant.create({
      data: {
        ...restData,
        userId: user.id,
        location: {
          createMany: {
            data: location,
          },
        },
      },
    });
  }

  async findAll(id: string, { skip, take }: { skip: number; take: number }) {
    return await this.prisma.restaurant.findMany({
      where: {
        userId: id,
      },
      skip,
      take,
    });
  }

  async findOne(id: string): Promise<ReadRestaurantDto> {
    return await this.prisma.restaurant.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<CreateRestaurantDto>) {
    const { location, ...restData } = data;
    return await this.prisma.restaurant.update({
      where: { id },
      data: {
        ...restData,
        location: location
          ? {
              deleteMany: {}, // Clear existing locations
              create: location, // Create new locations
            }
          : undefined,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.restaurant.delete({
      where: { id },
    });
  }
}
