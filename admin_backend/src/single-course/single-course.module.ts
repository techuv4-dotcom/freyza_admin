import { Module } from '@nestjs/common';
import { SingleCourseService } from './single-course.service';
import { SingleCourseController } from './single-course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CourseCardModule } from 'src/course-card/course-card.module';
// import { CourseCard } from 'src/course-card/entities/course-card.entity';
import { SingleCourse } from './entities/single-course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SingleCourse])],
  controllers: [SingleCourseController],
  providers: [SingleCourseService],
})
export class SingleCourseModule {}
