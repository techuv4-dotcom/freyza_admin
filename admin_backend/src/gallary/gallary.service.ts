import { Injectable } from '@nestjs/common';
import { CreateGallaryDto } from './dto/create-gallary.dto';
import { UpdateGallaryDto } from './dto/update-gallary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GallaryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepo: Repository<Gallery>,
  ) {}
  async create(createGallaryDto: CreateGallaryDto) {
    try {
      const response = await this.galleryRepo.save({
        imageUrl: createGallaryDto.imageUrl,
        type: createGallaryDto.type,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const response = await this.galleryRepo.find();
      return response.map((resp) => ({
        id: resp.id,
        imageUrl: `${process.env.APP_URL}${resp.imageUrl}`,
        type: resp.type,
      }));
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} gallary`;
  }

  async update(id: number, updateGallaryDto: UpdateGallaryDto) {
    try {
      const response = await this.galleryRepo.update(id, updateGallaryDto);
      return response;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async remove(id: number) {
    try {
      const resp = await this.galleryRepo.delete(id);
      return `This action removes a #${id} gallary`;
    } catch (error) {
      console.log(error);
      // throw new Error(error);
      throw error;
    }
  }
}
