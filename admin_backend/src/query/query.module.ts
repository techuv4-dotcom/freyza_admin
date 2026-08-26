import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Query } from './entities/query.entity';
import { SingleCourse } from 'src/single-course/entities/single-course.entity';
import { MailModule } from 'src/Mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Query, SingleCourse]), MailModule],
  controllers: [QueryController],
  providers: [QueryService],
})
export class QueryModule {}
