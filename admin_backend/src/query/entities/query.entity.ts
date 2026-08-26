// import { CourseCard } from "src/course-card/entities/course-card.entity";
import { SingleCourse } from 'src/single-course/entities/single-course.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('querys')
export class Query {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: string;

  @Column()
  declare email: string;

  @Column()
  declare number: string;

  @Column()
  declare message: string;

  @Column({ default: 'true' })
  declare status: string;

  @ManyToOne(() => SingleCourse, (SingleCourse) => SingleCourse.querys)
  declare course: SingleCourse;

  @CreateDateColumn()
  declare createdAt: Date;

  @UpdateDateColumn()
  declare updatedAt: Date;
}
