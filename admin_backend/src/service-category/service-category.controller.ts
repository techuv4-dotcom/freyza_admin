import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { CreateServiceCategoryHeadingDto } from './dto/create-service-category-headings.dto';

@Controller('service-category')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Post()
  create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
    return this.serviceCategoryService.create(createServiceCategoryDto);
  }

  @Post('heading')
  createHeading(
    @Body() CreateServiceCategoryHeadingDto: CreateServiceCategoryHeadingDto,
  ) {
    return this.serviceCategoryService.createHeading(
      CreateServiceCategoryHeadingDto,
    );
  }

  @Get()
  findAll() {
    return this.serviceCategoryService.findAll();
  }

  @Get('name')
  findAllName() {
    return this.serviceCategoryService.findAllName();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceCategoryDto: UpdateServiceCategoryDto,
  ) {
    return this.serviceCategoryService.update(+id, updateServiceCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceCategoryService.remove(+id);
  }

  @Delete(':categoryId/headings/:headingId')
  removeHeading(
    @Param('categoryId') categoryId: string,
    @Param('headingId') headingId: string,
  ) {
    return this.serviceCategoryService.removeHeading(+categoryId, +headingId);
  }
}
