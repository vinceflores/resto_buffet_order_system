import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDTO } from './dto/CreateTableDTO';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}
  @Post()
  async create(@Body() body: CreateTableDTO) {
    return this.tableService.create(body);
  }

  @Get('/findAll/:resId')
  async findAll(@Param('resId') resId: string) {
    return this.tableService.findAll(resId);
  }

  @Patch(':tableId')
  async update(@Param('tableId') tableId: string, @Body() body: any) {
    return this.tableService.update(tableId, body);
  }

  @Delete(':tableId')
  async delete(@Param('tableId') tableId: string) {
    return this.tableService.delete(tableId);
  }
}
