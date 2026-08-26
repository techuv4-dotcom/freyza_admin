import { Module } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';
import { ServiceCategoryHeading } from './entities/service_category-headings';
// import { ServiceGroup } from './entities/service-group';
import { Servicce } from 'src/services/entities/servicce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCategory } from './entities/service-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceCategory,
      ServiceCategoryHeading,
      Servicce,
    ]),
  ],
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService],
})
export class ServiceCategoryModule {}
