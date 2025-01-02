import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({ cors: true, namespace: 'tables' })
export class TableGateway implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  @WebSocketServer()
  private server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {});
  }

  // get list of available tables
  @SubscribeMessage('getTables')
  async getTables(@MessageBody() body: any) {
    const data = await this.prisma.table.findMany();
    return { data };
  }

  // update list of available tables on reservation
  @SubscribeMessage('reserveTable')
  async reserveTable(@MessageBody() body: any) {
    this.server.emit('getTables', { hello: 'hello from reserveTables' });
  }

  // update list of available tables on table occupation
  @SubscribeMessage('occupyTable')
  async occupyTable(@MessageBody() body: any) {
    this.server.emit('getTables', {});
  }

  // update list of available tables on table vacancy
  @SubscribeMessage('vacateTable')
  async vacateTable(@MessageBody() body: any) {
    this.server.emit('getTables', {});
  }
}
