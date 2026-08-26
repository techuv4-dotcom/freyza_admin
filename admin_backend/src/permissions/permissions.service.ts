import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { permission } from 'process';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const resp = await this.permissionRepo.save({
      module: createPermissionDto.module,
      permission: createPermissionDto.permission,
      key: createPermissionDto.key,
    });
    return {
      statusCode: 201,
      message: 'Permission created successfully',
      data: resp,
    };
  }

  async findAll() {
    const resp = await this.permissionRepo.find();
    return {
      statusCode: 200,
      message: 'All permissions fetched',
      data: resp,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
