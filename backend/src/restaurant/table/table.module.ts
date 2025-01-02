import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TableGateway } from './table.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [TableController],
  providers: [TableService, TableGateway],
  exports: [TableService],
})
export class TableModule {}
