import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDTO } from './dto/CreateTableDTO';
import { UpdateTableDTO } from './dto/UpadteTableDTO';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(table: CreateTableDTO) {
    await this.prisma.table.create({
      data: { isReserved: false, ...table },
    });
  }

  async findAll(tableId: string) {
    return await this.prisma.table.findMany({
      where: { restaurantId: tableId },
    });
  }

  async update(tableId: string, table: UpdateTableDTO) {
    return await this.prisma.table.update({
      where: { id: tableId },
      data: table,
    });
  }

  async delete(tableId: string) {
    await this.prisma.table.delete({ where: { id: tableId } });
  }
}
