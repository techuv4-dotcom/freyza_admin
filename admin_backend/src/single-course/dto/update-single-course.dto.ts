import { PartialType } from '@nestjs/mapped-types';
import { CreateSingleCourseDto } from './create-single-course.dto';

export class UpdateSingleCourseDto extends PartialType(CreateSingleCourseDto) {}
