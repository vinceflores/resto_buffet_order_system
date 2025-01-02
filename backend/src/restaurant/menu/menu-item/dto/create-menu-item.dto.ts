import { OmitType } from '@nestjs/mapped-types';
import { Item } from '@prisma/client';
import { isDefined, IsDefined, IsString } from 'class-validator';

export class CreateMenuItemDto {
  @IsDefined()
  @IsString()
  menuId: string;

  @IsDefined()
  item: Omit<Item, 'id'>;
}
