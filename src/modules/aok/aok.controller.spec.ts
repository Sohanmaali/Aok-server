import { Test, TestingModule } from '@nestjs/testing';
import { AokController } from './aok.controller';

describe('AokController', () => {
  let controller: AokController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AokController],
    }).compile();

    controller = module.get<AokController>(AokController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
