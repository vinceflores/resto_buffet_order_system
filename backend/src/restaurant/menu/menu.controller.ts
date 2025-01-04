import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDTO } from './dto/CreateMenuDTO';
import { UpdateMenuDTO } from './dto/UpdateMenuDTO';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() body: CreateMenuDTO) {
    return this.menuService.create(body);
  }

  @Get(':resId')
  async findAll(
    @Param('resId') resId: string,
    @Param('skip') skip: number = 0,
    @Param('take') take: number = 10,
  ) {
    return this.menuService.findAll(resId, skip, take);
  }

  @Get(':menuId')
  async findOne(@Param('menuId') menuId: string) {
    return this.menuService.findOne(menuId);
  }

  @Patch(':menuId')
  async update(@Param('menuId') menuId: string, @Body() body: UpdateMenuDTO) {
    return this.menuService.update(menuId, body);
  }

  @Delete(':menuId')
  async delete(@Param('menuId') menuId: string) {
    this.menuService.delete(menuId);
  }
}
