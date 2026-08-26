import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { permission } from 'process';
import { StaffService } from 'src/staff/staff.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersService,
    private staffServices: StaffService,
    private jwtServices: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.staffServices.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const check = await argon2.verify(user.password, password);

    if (!check) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const paylod = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      // permission:user.permissions
    };

    const accessToken = await this.jwtServices.signAsync(paylod, {
      secret: 'secretkey',
    });

    return {
      statusCode: 201,
      message: 'Login successfully',
      accessToke: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
