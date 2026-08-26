import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategory } from './entities/service-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceCategoryHeadingDto } from './dto/create-service-category-headings.dto';
import { ServiceCategoryHeading } from './entities/service_category-headings';

export interface categoryName {
  id: number;
  name: string;
}

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectRepository(ServiceCategory)
    private serviceCategoryRepo: Repository<ServiceCategory>,

    @InjectRepository(ServiceCategoryHeading)
    private serviceCategoryHeadingRepo: Repository<ServiceCategoryHeading>,
  ) {}

  async findDashboard() {
    const resp = await this.findAll();
  }

  async create(dto: CreateServiceCategoryDto) {
    console.log(dto);

    try {
      const category = await this.serviceCategoryRepo.save({
        name: dto.name,
        imageUrl: `${dto.imageUrl}`,
        iconUrl: `${dto.iconUrl}`,
        title: dto.title,
        description: dto.description,
        shortDescription: dto.shortDescription,
        activeStatus: dto.activeStatus,
        slug: dto.slug,
      });

      await this.serviceCategoryHeadingRepo.save({
        heading: dto.subHeading,
        description: dto.subDescription,
        serviceCategory: category,
      });

      console.log(category);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async createHeading(dto: CreateServiceCategoryHeadingDto) {
    try {
      console.log('request come');

      const category = await this.serviceCategoryRepo.findOne({
        where: {
          id: dto.serviceCategoryId,
        },
      });

      if (!category) {
        throw new Error('Service Category not found');
      }

      return await this.serviceCategoryHeadingRepo.save({
        heading: dto.heading,
        description: dto.description,
        serviceCategory: category,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const response = await this.serviceCategoryRepo.find({
        relations: {
          headings: true,
        },
      });
      return response.map((item) => ({
        id: item.id,
        name: item.name,
        imageUrl: `${process.env.APP_URL}${item.imageUrl}`,
        iconUrl: `${process.env.APP_URL}${item.iconUrl}`,
        title: item.title,
        description: item.description,
        shortDescription: item.shortDescription,
        activeStatus: item.activeStatus,
        slug: item.slug,
        headings: item.headings,
      }));
    } catch (error) {
      throw error;
    }
  }

  async findAllName() {
    console.log('category START');

    const response = await this.serviceCategoryRepo.find();

    console.log('category END');

    return response;
  }
  // async findAllName() {
  //   try {
  //     const response = await this.serviceCategoryRepo.find();

  //     return response.map((item) => ({
  //       id: item.id,
  //       name: item.name,
  //     }));
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  async findOne(id: number) {
    try {
      const item = await this.serviceCategoryRepo.findOne({
        where: {
          id: id,
        },
        relations: {
          headings: true,
        },
      });
      // return response;
      return {
        id: item?.id,
        name: item?.name,
        imageUrl: `${process.env.APP_URL}${item?.imageUrl}`,
        iconUrl: `${process.env.APP_URL}${item?.iconUrl}`,
        title: item?.title,
        description: item?.description,
        shortDescription: item?.shortDescription,
        activeStatus: item?.activeStatus,
        slug: item?.slug,
        headings: item?.headings,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateServiceCategoryDto: UpdateServiceCategoryDto) {
    // console.log('request comes');
    // console.log(updateServiceCategoryDto);

    try {
      const response = await this.serviceCategoryRepo.update(
        id,
        updateServiceCategoryDto,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} serviceCategory`;
  }

  async removeHeading(categoryId: number, headingId: number) {
    const result = await this.serviceCategoryHeadingRepo.delete({
      id: headingId,
      serviceCategory: {
        id: categoryId,
      },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Heading not found');
    }

    return {
      message: 'Heading deleted successfully',
    };
  }
}
