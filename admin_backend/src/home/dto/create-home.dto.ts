import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  declare bannerUrl: string;

  @IsString()
  @IsNotEmpty()
  declare subBannerUrl: string;

  @IsString()
  @IsNotEmpty()
  declare title: string;

  @IsString()
  @IsNotEmpty()
  declare description: string;

  @IsString()
  @IsNotEmpty()
  declare subHeading: string;

  @IsString()
  @IsNotEmpty()
  declare subDescription: string;
}
