import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { Repository } from 'typeorm';
import { Servicce } from 'src/services/entities/servicce.entity';
import { Subscriber } from 'src/subscribers/entities/subscriber.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { ServiceRequest } from 'src/service_requests/entities/service_request.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private homeRepo: Repository<Home>,
    @InjectRepository(Servicce)
    private serviceRepo: Repository<Servicce>,
    @InjectRepository(Subscriber)
    private subscriberRepo: Repository<Subscriber>,
    @InjectRepository(Appointment)
    private appointmentsRepo: Repository<Appointment>,
    @InjectRepository(ServiceRequest)
    private serviceRequestRepo: Repository<ServiceRequest>,
  ) {}
  async create(createHomeDto: CreateHomeDto) {
    try {
      const response = await this.homeRepo.save({
        bannerUrl: createHomeDto.bannerUrl,
        subBannerUrl: createHomeDto.subBannerUrl,
        title: createHomeDto.title,
        description: createHomeDto.description,
        subHeading: createHomeDto.subHeading,
        subDescription: createHomeDto.subDescription,
      });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }

    // return 'This action adds a new home';
  }

  async getDashboard() {
    const TotalServices = await this.serviceRepo.count();
    const TotalSubscribers = await this.subscriberRepo.count();
    const TotalBookings = await this.appointmentsRepo.count();
    const TotalServiceRequest = await this.serviceRequestRepo.count();
    const RecentBookings = await this.appointmentsRepo
      .createQueryBuilder('appointment')
      .where('DATE(appointment.booked_at) = CURDATE()')
      .orderBy('appointment.booked_at', 'DESC')
      .getMany();
    const LatestSubscribers = await this.subscriberRepo.find({
      order: {
        id: 'DESC',
      },
    });
    return {
      TotalServices,
      TotalSubscribers,
      TotalBookings,
      TotalServiceRequest,
      RecentBookings,
      LatestSubscribers,
    };
  }

  async findAll() {
    try {
      const response = await this.homeRepo.find();
      return response.map((resp) => ({
        id: resp.id,
        bannerUrl: `${process.env.APP_URL}${resp.bannerUrl}`,
        subBannerUrl: `${process.env.APP_URL}${resp.subBannerUrl}`,
        title: resp.title,
        description: resp.description,
        subHeading: resp.subHeading,
        subDescription: resp.subDescription,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} home`;
  }

  async update(id: number, updateHomeDto: UpdateHomeDto) {
    try {
      await this.homeRepo.update(id, updateHomeDto);
      return `This action updates a #${id} home`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} home`;
  }
}
