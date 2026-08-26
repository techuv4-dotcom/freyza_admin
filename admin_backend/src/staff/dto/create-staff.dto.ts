import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStaffDto {
  @IsString()
  // @IsNotEmpty()
  declare profileUrl: string;

  @IsString()
  @IsNotEmpty()
  declare name: string;

  @IsEmail()
  @IsNotEmpty()
  declare email: string;

  @IsString()
  @IsNotEmpty()
  declare password: string;

  @IsString()
  @IsNotEmpty()
  declare phone: string;

  @IsString()
  // @IsNotEmpty()
  declare gender: string;

  // @Type(() => Date)
  // @IsDate()
  // @IsOptional()
  // declare dob: Date;
  @IsOptional()
  @IsDateString()
  declare dob?: string;

  @IsString()
  @IsNotEmpty()
  declare designation: string;

  @IsNumber()
  @IsNotEmpty()
  declare role: number;

  @IsString()
  // @IsNotEmpty()
  declare experience: string;

  // @IsDateString()
  // declare joiningDate: Date;
  // @Type(() => Date)
  // @IsDate()
  // @IsOptional()
  // declare joiningDate: Date;

  @IsOptional()
  @IsDateString()
  declare joiningDate?: string;

  @IsOptional()
  @IsString()
  declare salary: string;

  @IsOptional()
  @IsBoolean()
  declare status: boolean;

  @IsString()
  // @IsNotEmpty()
  declare address: string;
}
