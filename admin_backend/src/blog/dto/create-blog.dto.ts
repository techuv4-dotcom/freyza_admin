import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  declare imageUrl: string;

  @IsString()
  @IsNotEmpty()
  declare title: string;

  @IsString()
  @IsNotEmpty()
  declare description: string;

  @IsString()
  @IsNotEmpty()
  declare slug: string;

  @Type(() => Number)
  @IsNumber()
  declare servicecategory: number | null;
}
