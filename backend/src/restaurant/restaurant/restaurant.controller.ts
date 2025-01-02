import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/CreateRestaurantDto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async create(@Body() body: CreateRestaurantDto) {
    return await this.restaurantService.create(body);
  }

  @Get(':userId')
  async findAll(
    @Param('userId') userId,
    @Query('skip') skip = 0,
    @Query('take') take = 10,
  ) {
    return await this.restaurantService.findAll(userId, { skip, take });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.restaurantService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateRestaurantDto>,
  ) {
    return await this.restaurantService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.restaurantService.delete(id);
  }
}
