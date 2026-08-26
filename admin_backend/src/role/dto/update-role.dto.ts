import { IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoleDto {
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  declare permissions: number[];
}
