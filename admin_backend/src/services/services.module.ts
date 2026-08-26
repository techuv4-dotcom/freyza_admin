import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
// import { Service } from './entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Servicce } from './entities/servicce.entity';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';
// import { ServiceGroup } from 'src/service-category/entities/service-group-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servicce, ServiceCategory])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
