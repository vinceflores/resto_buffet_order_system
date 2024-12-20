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

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() body: CreateMenuDTO) {
    // return 'create menu and connect to restaurant';
    return this.menuService.create(body)
  }

  @Get(':resId')
  async findAll(@Param('resId') resId: string) {
    // return 'get all menu items for a restaurant';
    return this.menuService.findAll(resId)
  }

  @Patch(':menuId')
  async update(@Param('menuId') menuId: string, @Body() body: CreateMenuDTO) {
    // return 'update menu item';
    return this.menuService.update(menuId, body)
  }

  @Delete(':menuId')
  async delete(@Param('menuId') menuId: string) {
    // return 'delete menu item';
    this.menuService.delete(menuId)
  }
}
