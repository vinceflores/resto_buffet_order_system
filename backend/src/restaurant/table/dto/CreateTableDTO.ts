import { Table } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateTableDTO {
  @IsOptional()
  id?: string;

  @IsPositive()
  seats: number;

  @IsPositive()
  seated: number;

  @IsPositive()
  total: number;

  @IsBoolean()
  isReserved: boolean;

  @IsDefined()
  restaurantId: string;
}
