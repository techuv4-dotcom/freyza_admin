import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
// import { title } from 'process';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,

    @InjectRepository(ServiceCategory)
    private serviceCategoryRepo: Repository<ServiceCategory>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      if (createBlogDto.servicecategory === null) {
        const response = await this.blogRepo.save({
          imageUrl: createBlogDto.imageUrl,
          title: createBlogDto.title,
          description: createBlogDto.description,
          slug: createBlogDto.slug,
          servicecategory: null,
        });
        return response;
      }
      const category = await this.serviceCategoryRepo.findOne({
        where: {
          id: createBlogDto.servicecategory,
        },
      });
      if (!category) {
        return `ServiceCategory not available with id ${createBlogDto.servicecategory} `;
      }
      const response = await this.blogRepo.save({
        imageUrl: createBlogDto.imageUrl,
        title: createBlogDto.title,
        description: createBlogDto.description,
        slug: createBlogDto.slug,
        servicecategory: category,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const response = await this.blogRepo.find({
        relations: {
          servicecategory: true,
        },
      });
      return response.map((service) => ({
        id: service.id,
        title: service.title,
        imageUrl: `${process.env.APP_URL}${service.imageUrl}`,
        description: service.description,
        slug: service.slug,
        serviceCategoryId: service.servicecategory?.id ?? null,
        serviceCategoryName: service.servicecategory?.name ?? null,
      }));
    } catch (error) {
      throw error;
    }
  }

  //   async findAll() {
  //   console.log("Step 1");

  //   const response = await this.blogRepo.find({
  //     relations: {
  //       servicecategory: true,
  //     },
  //   });

  //   console.log("Step 2");

  //   return response.map((service) => ({
  //     id: service.id,
  //     title: service.title,
  //     imageUrl: service.imageUrl,
  //     description: service.description,
  //     slug: service.slug,
  //     serviceCategoryId: service.servicecategory?.id ?? null,
  //     serviceCategoryName: service.servicecategory?.name ?? null,
  //   }));
  // }

  async findOne(id: number) {
    try {
      const resp = await this.blogRepo.findOne({
        where: {
          id: id,
        },
      });

      return resp;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    // await this.blogRepo.update(id,updateBlogDto)
    const payload: any = {
      ...updateBlogDto,
    };

    if (updateBlogDto.servicecategory !== undefined) {
      payload.servicecategory = updateBlogDto.servicecategory
        ? { id: updateBlogDto.servicecategory }
        : null;
    }

    try {
      await this.blogRepo.update(id, payload);
      return 'Journal updated';
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    const resp = await this.blogRepo.delete(id);
    return `This action removes a #${id} blog`;
  }
}
