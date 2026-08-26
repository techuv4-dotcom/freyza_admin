import { Query } from 'src/query/entities/query.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('single-course')
export class SingleCourse {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ type: 'varchar', length: 255 })
  declare title: string;

  @Column({ type: 'text', nullable: true })
  declare shortDescription: string;

  @Column({ type: 'text' })
  declare description: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  declare rating: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  declare price: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  declare discountPercentage: number;

  @Column({ type: 'json' })
  declare images: string[];

  @Column({ type: 'text' })
  declare aboutCourse: string;

  @Column({ type: 'json' })
  declare whatYouLearn: string[];

  @Column({ type: 'json' })
  declare courseDetails: {
    duration: string;
    batchTiming: string;
    level: string;
    language: string;
    certificate: string;
    placement: string;
  };

  @Column({ type: 'json' })
  declare courseCurriculum: {
    module: string;
    data: string[];
  }[];

  @Column({ default: true })
  declare status: boolean;

  @OneToMany(() => Query, (querys) => querys.course)
  declare querys: Query[];

  @CreateDateColumn()
  declare createdAt: Date;

  @UpdateDateColumn()
  declare updatedAt: Date;
}
