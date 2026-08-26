import { Test, TestingModule } from '@nestjs/testing';
import { SingleCourseService } from './single-course.service';

describe('SingleCourseService', () => {
  let service: SingleCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SingleCourseService],
    }).compile();

    service = module.get<SingleCourseService>(SingleCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
