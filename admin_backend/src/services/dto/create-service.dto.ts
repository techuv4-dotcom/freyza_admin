import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  declare name: string;

  @IsString()
  @IsNotEmpty()
  declare imageUrl: string;

  @IsString()
  @IsNotEmpty()
  declare duration: string;

  @IsNumber()
  @Min(0)
  declare price: number;

  @IsBoolean()
  declare activeStatus: boolean;

  @IsString()
  declare about: string;

  @IsNotEmpty()
  @IsIn(['Male', 'Female'])
  declare group: 'Male' | 'Female';

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  declare serviceCategoryId: number;
}
