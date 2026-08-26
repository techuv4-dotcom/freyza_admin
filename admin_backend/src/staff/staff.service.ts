import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Repository } from 'typeorm';
// import { STATUS_CODES } from 'http';
import { Role } from 'src/role/entities/role.entity';
// import { argon2 } from 'crypto';
import * as argon2 from 'argon2';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepo: Repository<Staff>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}
  async create(createStaffDto: CreateStaffDto) {
    const role = await this.roleRepo.findOne({
      where: {
        id: createStaffDto.role,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }
    try {
      const hashPassword = await argon2.hash(createStaffDto.password);
      const resp = await this.staffRepo.save({
        name: createStaffDto.name,
        email: createStaffDto.email,
        address: createStaffDto.address,
        profileUrl: createStaffDto.profileUrl,
        phone: createStaffDto.phone,
        gender: createStaffDto.gender,
        designation: createStaffDto.designation,
        dob: createStaffDto.dob,
        password: hashPassword,
        joiningDate: createStaffDto.joiningDate,
        experience: createStaffDto.experience,
        role: role ?? null,
        salary: createStaffDto.salary,
        status: createStaffDto.status,
      });
      return {
        statusCode: 201,
        message: 'Staff created Successfully',
        data: resp,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    const resp = await this.staffRepo.find({
      relations: {
        role: {
          permissions: true,
        },
      },
    });
    return {
      statusCode: 201,
      message: 'all staff fetched',
      data: resp,
    };
  }

  async findOne(email: string) {
    const resp = await this.staffRepo.findOne({
      where: {
        email,
      },
      relations: {
        role: {
          permissions: true,
        },
      },
    });
    return resp;

    // return `This action returns a #${id} staff`;
  }

  async findOnebyId(id: number) {
    // console.log("Received ID:", id);
    // console.log("ID type:", typeof id);

    const resp = await this.staffRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        role: {
          permissions: true,
        },
      },
    });

    // console.log("Found user:", resp);

    return resp;
  }

  // async update(id: number, updateStaffDto: UpdateStaffDto) {

  //   const resp = await this.staffRepo.update(id,updateStaffDto)

  //   return resp
  // }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.staffRepo.findOne({
      where: { id },
    });

    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    let role;

    if (updateStaffDto.role) {
      role = await this.roleRepo.findOne({
        where: {
          id: updateStaffDto.role,
        },
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }
    }

    const updateData: any = {
      ...updateStaffDto,
    };

    // DTO se numeric role hatao
    delete updateData.role;

    // Actual Role entity assign karo
    if (role) {
      updateData.role = role;
    }

    await this.staffRepo.update(id, updateData);

    return {
      statusCode: 200,
      message: 'Staff updated successfully',
    };
  }

  async remove(id: number) {
    const resp = await this.staffRepo.delete(id);
    return {
      statusCode: 200,
      message: 'User deleted',
      data: resp,
    };
  }
}
