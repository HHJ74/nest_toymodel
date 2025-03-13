import { Test, TestingModule } from '@nestjs/testing';
import { SubPtService } from './sub_pt.service';

describe('SubPtService', () => {
  let service: SubPtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubPtService],
    }).compile();

    service = module.get<SubPtService>(SubPtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
