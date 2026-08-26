import { Injectable } from '@nestjs/common';
import { CreateSingleCourseDto } from './dto/create-single-course.dto';
import { UpdateSingleCourseDto } from './dto/update-single-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SingleCourse } from './entities/single-course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SingleCourseService {
  constructor(
    @InjectRepository(SingleCourse)
    private singleCourseRepo: Repository<SingleCourse>,
  ) {}
  async create(createSingleCourseDto: CreateSingleCourseDto) {
    const resp = await this.singleCourseRepo.save({
      aboutCourse: createSingleCourseDto.aboutCourse,
      shortDescription: createSingleCourseDto.shortDescription,
      courseCurriculum: createSingleCourseDto.courseCurriculum,
      courseDetails: createSingleCourseDto.courseDetails,
      description: createSingleCourseDto.description,
      discountPercentage: createSingleCourseDto.discountPercentage,
      images: createSingleCourseDto.images,
      price: createSingleCourseDto.price,
      rating: createSingleCourseDto.rating,
      title: createSingleCourseDto.title,
      whatYouLearn: createSingleCourseDto.whatYouLearn,
      status: createSingleCourseDto.status,
    });
    return {
      statusCode: 200,
      messsage: 'Single course details added',
      data: resp,
    };
  }

  async findAll() {
    const resp = await this.singleCourseRepo.find();
    return {
      statusCode: 200,
      message: 'all course are fetched',
      data: resp,
    };
  }

  async findCard() {
    const resp = await this.singleCourseRepo.find();

    const data = resp.map((item) => ({
      id: item.id,
      title: item.title,
      shortDescription: item.shortDescription,
      rating: item.rating,
      price: item.price,
      image: item.images?.[0],
      duration: item.courseDetails?.duration,
      level: item.courseDetails?.level,
      status: item.status,
    }));

    return {
      statusCode: 200,
      message: 'All cards are fetched',
      data,
    };
  }

  async findOne(id: number) {
    const resp = await this.singleCourseRepo.findOne({
      where: {
        id: id,
      },
    });
    return resp;
  }

  async update(id: number, updateSingleCourseDto: UpdateSingleCourseDto) {
    const resp = await this.singleCourseRepo.update(id, updateSingleCourseDto);
    return `This action updates a #${id} singleCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} singleCourse`;
  }
}
