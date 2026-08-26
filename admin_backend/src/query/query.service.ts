import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from './entities/query.entity';
import { Any, Repository } from 'typeorm';
import { SingleCourse } from 'src/single-course/entities/single-course.entity';
import { MailService } from 'src/Mail/mail.service';

export interface queryData {
  // id: number;
  name: string;
  email: string;
  number: string;
  course: string;
  message: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class QueryService {
  constructor(
    @InjectRepository(Query)
    private queryRepo: Repository<Query>,
    @InjectRepository(SingleCourse)
    private courseRepo: Repository<SingleCourse>,
    private mailService: MailService,
  ) {}

  async findCourse(courseID: number) {
    const course = await this.courseRepo.findOne({
      where: {
        id: courseID,
      },
    });
    return course;
  }

  async create(createQueryDto: CreateQueryDto) {
    const course = await this.findCourse(createQueryDto.courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }
    const resp = await this.queryRepo.save({
      name: createQueryDto.name,
      email: createQueryDto.email,
      number: createQueryDto.number,
      message: createQueryDto.message,
      course: course,
    });

    try {
      await this.mailService.sendQueryConfirmation(
        createQueryDto.email,
        createQueryDto.name,
        course.title,
      );

      await this.mailService.sendQueryNotification(
        createQueryDto.name,
        createQueryDto.email,
        createQueryDto.number,
        course.title,
        course.price,
        createQueryDto.message,
      );
    } catch (error) {
      console.error('Email sending failed:', error);
    }
    return {
      statusCode: 200,
      message: 'Query added',
      data: resp,
    };
  }

  async findAll() {
    const data2: queryData[] = [];
    const resp = await this.queryRepo.find({
      relations: {
        course: true,
      },
    });

    resp.map((item) =>
      data2.push({
        name: item.name,
        email: item.email,
        number: item.number,
        message: item.message,
        course: item.course.title,
        price:item.course.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }),
    );
    return {
      statusCode: 200,
      message: 'all Querys fetch successfully',
      data: data2,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} query`;
  }

  update(id: number, updateQueryDto: UpdateQueryDto) {
    return `This action updates a #${id} query`;
  }

  remove(id: number) {
    return `This action removes a #${id} query`;
  }
}
