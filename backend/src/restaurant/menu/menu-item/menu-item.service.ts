import { Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuItemDto: CreateMenuItemDto) {
    await this.prisma.item.create({
      data: {
        menuId: createMenuItemDto.menuId,
        ...createMenuItemDto.item,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.item.findFirst({
      where: { id },
    });
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    return await this.prisma.item.update({
      where: { id },
      data: {
        ...updateMenuItemDto.item,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.item.delete({ where: { id } });
  }
}
