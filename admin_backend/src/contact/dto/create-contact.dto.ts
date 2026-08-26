import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OpeningHourDto {
  @IsString()
  @IsNotEmpty()
  declare day: string;

  @IsString()
  @IsNotEmpty()
  declare openingTime: string;

  @IsString()
  @IsNotEmpty()
  declare closingTime: string;

  @IsBoolean()
  declare closed: boolean;
}

class SocialLinkDto {
  @IsString()
  @IsNotEmpty()
  declare platform: string;

  @IsString()
  @IsNotEmpty()
  declare url: string;
}

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  declare imageUrl: string;

  @IsString()
  @IsNotEmpty()
  declare address: string;

  @IsString()
  @IsNotEmpty()
  declare contactNumber: string;

  @IsEmail()
  declare emailAddress: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpeningHourDto)
  declare openingHours: OpeningHourDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  declare links: SocialLinkDto[];
}
