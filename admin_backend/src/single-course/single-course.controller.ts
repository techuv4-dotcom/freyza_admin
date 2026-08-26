import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { SingleCourseService } from './single-course.service';
import { CreateSingleCourseDto } from './dto/create-single-course.dto';
import { UpdateSingleCourseDto } from './dto/update-single-course.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('single-course')
export class SingleCourseController {
  constructor(private readonly singleCourseService: SingleCourseService) {}

  @Post()
  create(@Body() createSingleCourseDto: CreateSingleCourseDto) {
    return this.singleCourseService.create(createSingleCourseDto);
  }

  @Get()
  findAll() {
    return this.singleCourseService.findAll();
  }

  @Get('cards')
  findCard() {
    return this.singleCourseService.findCard();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.singleCourseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSingleCourseDto: UpdateSingleCourseDto,
  ) {
    return this.singleCourseService.update(+id, updateSingleCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.singleCourseService.remove(+id);
  }
}
