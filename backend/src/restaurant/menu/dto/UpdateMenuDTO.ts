import { IsDefined } from 'class-validator';
import { CreateMenuDTO } from './CreateMenuDTO';
import { Menu } from '@prisma/client';

export class UpdateMenuDTO {
  menu: Menu;
}
