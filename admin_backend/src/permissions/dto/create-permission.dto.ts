import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  declare permission: string;

  @IsString()
  @IsNotEmpty()
  declare module: string;

  @IsString()
  @IsNotEmpty()
  declare key: string;
}
