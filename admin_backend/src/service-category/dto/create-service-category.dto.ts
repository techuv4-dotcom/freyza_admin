import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  isNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServiceCategoryDto {
  @IsString()
  @IsNotEmpty()
  declare name: string;

  @IsString()
  @IsNotEmpty()
  declare imageUrl: string;

  @IsString()
  @IsNotEmpty()
  declare iconUrl: string;

  @IsString()
  @IsNotEmpty()
  declare title: string;

  @IsString()
  @IsNotEmpty()
  declare description: string;

  @IsString()
  @IsNotEmpty()
  declare shortDescription: string;

  @IsBoolean()
  @IsOptional()
  activeStatus?: boolean;

  @IsString()
  @IsNotEmpty()
  declare slug: string;

  @IsString()
  @IsNotEmpty()
  declare subHeading: string;

  @IsString()
  @IsNotEmpty()
  declare subDescription: string;
}
