import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { KitchenService } from './kitchen.service';
import { CreateKitchenDto } from './dto/create-kitchen.dto';
import { UpdateKitchenDto } from './dto/update-kitchen.dto';

@WebSocketGateway()
export class KitchenGateway {
  constructor(private readonly kitchenService: KitchenService) {}

  @SubscribeMessage('findOneKitchen')
  findOne(@MessageBody() id: number) {
    return this.kitchenService.findOne(id);
  }

  @SubscribeMessage('updateKitchen')
  update(@MessageBody() updateKitchenDto: UpdateKitchenDto) {
    return this.kitchenService.update(updateKitchenDto.id, updateKitchenDto);
  }

  @SubscribeMessage('removeKitchen')
  remove(@MessageBody() id: number) {
    return this.kitchenService.remove(id);
  }
}
