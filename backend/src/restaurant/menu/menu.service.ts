import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDTO } from './dto/CreateMenuDTO';
import { UpdateMenuDTO } from './dto/UpdateMenuDTO';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDTO) {
    return await this.prisma.menu.create({
      data: {
        ...createMenuDto,
        items: {
          createMany: {
            data: createMenuDto.items,
          },
        },
      },
    });
  }

  async findAll(resId: string, skip: number, take: number) {
    return await this.prisma.menu.findMany({
      where: {
        restaurantId: resId,
      },
      skip,
      take,
    });
  }

  async findOne(menuId: string) {
    return await this.prisma.menu.findFirst({
      where: { id: menuId },
    });
  }

  async update(menuId: string, updateMenuDTO: UpdateMenuDTO) {
    return await this.prisma.menu.update({
      where: { id: menuId },
      data: updateMenuDTO.menu,
    });
  }

  async delete(menuId: string) {
    await this.prisma.menu.delete({ where: { id: menuId } });
  }
}
