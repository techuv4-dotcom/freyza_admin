import { Module } from '@nestjs/common';
import { GallaryService } from './gallary.service';
import { GallaryController } from './gallary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery])],
  controllers: [GallaryController],
  providers: [GallaryService],
})
export class GallaryModule {}
