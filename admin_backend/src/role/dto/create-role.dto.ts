import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayUnique,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  declare role: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  declare permissions: number[];
}
