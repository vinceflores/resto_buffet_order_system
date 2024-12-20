import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDTO } from './dto/CreateTableDTO';
import { UpdateTableDTO } from './dto/UpadteTableDTO';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(table: CreateTableDTO) {}
  async findAll(tableId: string) {}
  async update(tableId: string, table: UpdateTableDTO) {}
  async delete(tableId: string) {}
}
