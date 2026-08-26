import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const permissions = await this.permissionRepo.findBy({
      id: In(createRoleDto.permissions),
    });
    const role = await this.roleRepo.save({
      role: createRoleDto.role,
      permissions: permissions,
    });
    return {
      statusCode: 201,
      message: 'Role created succsessfully',
      data: role,
    };
  }

  async findAll() {
    const resp = await this.roleRepo.find({
      relations: {
        permissions: true,
      },
    });
    return {
      statusCode: 200,
      message: 'fetched all Roles and permissions successfully',
      data: resp,
    };
  }

  async findRoles() {
    const resp = await this.roleRepo.find();
    return {
      statusCode: 201,
      message: 'fetched all roles successfully',
      data: resp,
    };
  }

  async findOne(id: number) {
    const resp = await this.roleRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        users: true,
      },
    });

    return {
      statusCode: 201,
      message: 'fetch successfully',
      data: resp,
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    //     console.log(updateRoleDto);
    // console.log(updateRoleDto.permissions);
    // console.log(typeof updateRoleDto.permissions);
    const permissions = await this.permissionRepo.findBy({
      id: In(updateRoleDto.permissions),
    });

    const role = await this.roleRepo.findOne({
      where: { id },
      relations: {
        permissions: true,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    role.permissions = permissions;

    await this.roleRepo.save(role);
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
