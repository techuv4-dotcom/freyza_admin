import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceCategoryHeadingDto {
  @IsString()
  @IsNotEmpty()
  declare heading: string;

  @IsString()
  @IsNotEmpty()
  declare description: string;

  @IsInt()
  @IsNotEmpty()
  declare serviceCategoryId: number;
}
