import { Item, Menu } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreateMenuDTO {
  @IsString()
  restaurantId: string;
  @IsArray()
  items: Omit<Item, 'id'>[];
}
