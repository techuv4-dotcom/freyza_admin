import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicce } from './entities/servicce.entity';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';
// import { log } from 'console';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Servicce)
    private serviceRepo: Repository<Servicce>,

    @InjectRepository(ServiceCategory)
    private serviceCategoryRepo: Repository<ServiceCategory>,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    try {
      const category = await this.serviceCategoryRepo.findOne({
        where: {
          id: createServiceDto.serviceCategoryId,
        },
      });

      const response = await this.serviceRepo.save({
        name: createServiceDto.name,
        price: createServiceDto.price,
        duration: createServiceDto.duration,
        imageUrl: createServiceDto.imageUrl,
        activeStatus: createServiceDto.activeStatus,
        about: createServiceDto.about,
        group: createServiceDto.group,
        serviceCategory: category!,
      });

      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const services = await this.serviceRepo.find({
        relations: {
          serviceCategory: true,
        },
      });

      return services.map((service) => ({
        id: service.id,
        name: service.name,
        imageUrl: `${process.env.APP_URL}${service.imageUrl}`,
        duration: service.duration,
        price: service.price,
        about: service.about,
        activeStatus: service.activeStatus,
        group: service.group,

        serviceCategoryId: service.serviceCategory.id,
        serviceCategoryName: service.serviceCategory.name,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: number) {
    const resp = await this.serviceRepo.findOne({
      where: {
        id: id,
      },
    });
    console.log(resp);

    return {
      id: resp?.id,
      imageUrl: `${process.env.APP_URL}${resp?.imageUrl}`,
      name: resp?.name,
      duration: resp?.duration,
      price: resp?.price,
      about: resp?.about,
      activeStatus: resp?.activeStatus,
      group: resp?.group,
    };
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const resp = await this.serviceRepo.update(id, updateServiceDto);
    return `This action updates a #${id} service`;
  }

  async remove(id: number) {
    const resp = await this.serviceRepo.delete(id);
    return `This action removes a #${id} service`;
  }
}
