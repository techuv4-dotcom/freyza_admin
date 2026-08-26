// import { IsNotEmpty, IsString } from 'class-validator';

// export class CreateAboutDto {
//   @IsString()
//   @IsNotEmpty()
//   declare bannerUrl: string;

//   @IsString()
//   @IsNotEmpty()
//   declare title: string;

//   @IsString()
//   @IsNotEmpty()
//   declare description: string;
// }

import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TeamMemberDto } from './team-member.dto';

export class CreateAboutDto {
  @IsString()
  @IsNotEmpty()
  declare bannerUrl: string;

  @IsString()
  @IsNotEmpty()
  declare title: string;

  @IsString()
  @IsNotEmpty()
  declare description: string;

  @IsArray()
  @IsString({ each: true })
  declare sliderImagesUrl: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamMemberDto)
  declare teamMembers: TeamMemberDto[];
}
