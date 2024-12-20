import { Test, TestingModule } from '@nestjs/testing';
import { KitchenGateway } from './kitchen.gateway';
import { KitchenService } from './kitchen.service';

describe('KitchenGateway', () => {
  let gateway: KitchenGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KitchenGateway, KitchenService],
    }).compile();

    gateway = module.get<KitchenGateway>(KitchenGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
