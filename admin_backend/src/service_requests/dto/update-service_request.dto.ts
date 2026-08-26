import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceRequestDto } from './create-service_request.dto';

export class UpdateServiceRequestDto extends PartialType(
  CreateServiceRequestDto,
) {}
