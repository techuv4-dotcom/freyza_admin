import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQueryDto {
  @IsString()
  @IsNotEmpty()
  declare name: string;

  @IsString()
  @IsNotEmpty()
  declare email: string;

  @IsString()
  @IsNotEmpty()
  declare number: string;

  @IsNumber()
  @IsNotEmpty()
  declare courseId: number;

  @IsString()
  declare message: string;
}
