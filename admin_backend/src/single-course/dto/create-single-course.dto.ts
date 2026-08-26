import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CourseDetailsDto {
  @IsString()
  @IsNotEmpty()
  declare duration: string;

  @IsString()
  @IsNotEmpty()
  declare batchTiming: string;

  @IsString()
  @IsNotEmpty()
  declare level: string;

  @IsString()
  @IsNotEmpty()
  declare language: string;

  @IsString()
  @IsNotEmpty()
  declare certificate: string;

  @IsString()
  @IsNotEmpty()
  declare placement: string;
}

class CourseCurriculumDto {
  @IsString()
  @IsNotEmpty()
  declare module: string;

  @IsArray()
  @IsString({ each: true })
  declare data: string[];
}

export class CreateSingleCourseDto {
  @IsString()
  @IsNotEmpty()
  declare title: string;

  @IsOptional()
  @IsString()
  declare shortDescription?: string;

  @IsString()
  @IsNotEmpty()
  declare description: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  declare rating: number;

  @IsNumber()
  @Min(0)
  declare price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  declare discountPercentage: number;

  @IsArray()
  @IsString({ each: true })
  declare images: string[];

  @IsString()
  @IsNotEmpty()
  declare aboutCourse: string;

  @IsArray()
  @IsString({ each: true })
  declare whatYouLearn: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => CourseDetailsDto)
  declare courseDetails: CourseDetailsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseCurriculumDto)
  declare courseCurriculum: CourseCurriculumDto[];

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
