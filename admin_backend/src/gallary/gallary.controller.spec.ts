import { Test, TestingModule } from '@nestjs/testing';
import { GallaryController } from './gallary.controller';
import { GallaryService } from './gallary.service';

describe('GallaryController', () => {
  let controller: GallaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GallaryController],
      providers: [GallaryService],
    }).compile();

    controller = module.get<GallaryController>(GallaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
