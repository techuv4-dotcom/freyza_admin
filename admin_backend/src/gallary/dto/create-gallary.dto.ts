import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGallaryDto {
  @IsString()
  @IsNotEmpty()
  declare imageUrl: string;

  @IsString()
  @IsNotEmpty()
  declare type: string;
}
