import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { Servicce } from 'src/services/entities/servicce.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Subscriber } from 'src/subscribers/entities/subscriber.entity';
import { ServiceRequest } from 'src/service_requests/entities/service_request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Home,
      Servicce,
      Appointment,
      Subscriber,
      ServiceRequest,
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
