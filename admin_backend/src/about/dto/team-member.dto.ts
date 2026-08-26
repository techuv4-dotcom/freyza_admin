import { IsNotEmpty, IsString } from 'class-validator';

export class TeamMemberDto {
  @IsString()
  @IsNotEmpty()
  declare imageUrl: string;

  @IsString()
  @IsNotEmpty()
  declare name: string;

  @IsString()
  @IsNotEmpty()
  declare experience: string;

  @IsString()
  @IsNotEmpty()
  declare about: string;

  @IsString()
  @IsNotEmpty()
  declare position: string;
}
