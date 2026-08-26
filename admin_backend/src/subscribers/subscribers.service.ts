import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepo: Repository<Subscriber>,
  ) {}

  async findAll() {
    const resp = await this.subscriberRepo.find({
      order: {
        id: 'DESC',
      },
    });
    return resp;
  }

  // @Injectable()
  // export class SubscribersService {
  create(createSubscriberDto: CreateSubscriberDto) {
    return 'This action adds a new subscriber';
  }

  // findAll() {
  //   return `This action returns all subscribers`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} subscriber`;
  }

  update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    return `This action updates a #${id} subscriber`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriber`;
  }
}
