import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
  ) {}
  async create(createContactDto: CreateContactDto) {
    try {
      const response = await this.contactRepo.save({
        imageUrl: createContactDto.imageUrl,
        address: createContactDto.address,
        contactNumber: createContactDto.contactNumber,
        emailAddress: createContactDto.emailAddress,
        openingHours: createContactDto.openingHours,
        links: createContactDto.links,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const response = await this.contactRepo.find();
      // console.log(response);

      // return {
      //   statusCode: 201,
      //   message: 'Data Fatched',
      //   data: response
      // };
      return response.map((resp) => ({
        id: resp.id,
        imageUrl: `${process.env.APP_URL}${resp.imageUrl}`,
        address: resp.address,
        contactNumber: resp.contactNumber,
        emailAddress: resp.emailAddress,
        openingHours: resp.openingHours,
        links: resp.links,
      }));
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    // console.log("comes");
    try {
      const resp = await this.contactRepo.update(id, updateContactDto);
      return resp;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
