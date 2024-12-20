import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDTO } from './dto/CreateMenuDTO';


@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDTO) {
    return null;
  }

  async findAll(resId: string) {
    return null;
  }

  async update(menuId: string, createMenuDto: CreateMenuDTO) {
    return null;
  }

  async delete(menuId: string) {
    return null;
  }
}
