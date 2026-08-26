import { Test, TestingModule } from '@nestjs/testing';
import { SingleCourseController } from './single-course.controller';
import { SingleCourseService } from './single-course.service';

describe('SingleCourseController', () => {
  let controller: SingleCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SingleCourseController],
      providers: [SingleCourseService],
    }).compile();

    controller = module.get<SingleCourseController>(SingleCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
