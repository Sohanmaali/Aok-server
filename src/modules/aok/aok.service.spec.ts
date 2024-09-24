import { Test, TestingModule } from '@nestjs/testing';
import { AokService } from './aok.service';

describe('AokService', () => {
  let service: AokService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AokService],
    }).compile();

    service = module.get<AokService>(AokService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
