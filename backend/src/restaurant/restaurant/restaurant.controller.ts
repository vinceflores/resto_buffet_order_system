import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.restaurantService.findOne(id);
  }

  @Put(':id')
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
