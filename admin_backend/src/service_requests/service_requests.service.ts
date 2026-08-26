import { Injectable } from '@nestjs/common';
import { CreateServiceRequestDto } from './dto/create-service_request.dto';
import { UpdateServiceRequestDto } from './dto/update-service_request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRequest } from './entities/service_request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceRequestsService {
  constructor(
    @InjectRepository(ServiceRequest)
    private serviceRequestRepo: Repository<ServiceRequest>,
  ) {}
  create(createServiceRequestDto: CreateServiceRequestDto) {
    return 'This action adds a new serviceRequest';
  }

  async findAll() {
    const resp = await this.serviceRequestRepo.find();
    console.log(resp);

    return resp;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceRequest`;
  }

  update(id: number, updateServiceRequestDto: UpdateServiceRequestDto) {
    return `This action updates a #${id} serviceRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceRequest`;
  }
}
