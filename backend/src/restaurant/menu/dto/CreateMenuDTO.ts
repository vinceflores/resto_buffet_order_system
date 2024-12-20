import { Item } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class CreateMenuDTO {
  @IsString()
  restaurantId: string;

  @IsArray()
  items: Partial<Item>[];
}
