import { Test, TestingModule } from '@nestjs/testing';
import { SubPtController } from './sub_pt.controller';

describe('SubPtController', () => {
  let controller: SubPtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubPtController],
    }).compile();

    controller = module.get<SubPtController>(SubPtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
