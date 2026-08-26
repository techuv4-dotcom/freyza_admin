import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await argon2.hash(createUserDto.password);

      const response = await this.userRepo.save({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashPassword,
        role: createUserDto.role,
      });
      console.log(response);

      return 'This action adds a new user';
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    let returnData;
    try {
      const response = await this.userRepo.findOne({
        where: { email },
      });

      returnData = response;
    } catch (error) {
      console.log(error);
    }

    return returnData;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
