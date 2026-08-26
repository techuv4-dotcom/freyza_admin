import { Injectable } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from './entities/about.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepo: Repository<About>,
  ) {}

  async create(createAboutDto: CreateAboutDto) {
    try {
      const response = await this.aboutRepo.save({
        bannerUrl: createAboutDto.bannerUrl,
        title: createAboutDto.title,
        description: createAboutDto.description,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const response = await this.aboutRepo.find();
      console.log(response[0].teamMembers);

      return response.map((resp) => ({
        id: resp.id,
        bannerUrl: `${process.env.APP_URL}${resp.bannerUrl}`,
        title: resp.title,
        description: resp.description,
        sliderImagesUrl: resp.sliderImagesUrl.map(
          (url) => `${process.env.APP_URL}${url}`,
        ),
        teamMembers: resp.teamMembers.map((member) => ({
          name: member.name,
          about: member.about,
          imageUrl: `${process.env.APP_URL}${member.imageUrl}`,
          position: member.position,
          experience: member.experience,
        })),
      }));
      console.log(response);
    } catch (error) {
      throw error;
    }
  }
  async findSlider() {
    // console.log("request is comes");

    try {
      return this.aboutRepo.findOne({
        where: { id: 1 },
        select: {
          sliderImagesUrl: true,
          teamMembers: true,
        },
      });
      // console.log(rt);
      // return rt
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} about`;
  }

  async update(id: number, updateAboutDto: UpdateAboutDto) {
    try {
      const response = await this.aboutRepo.update(id, updateAboutDto);
      return response;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} about`;
  }
}
