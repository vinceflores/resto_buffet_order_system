import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: 'orders' })
export class OrderGateway implements OnModuleInit {
  @WebSocketServer()
  private server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {});
  }

  // update list of orders on new incoming order
  // update list of orders on cancelation of order
  // update lis t of orders on completion of order
}
