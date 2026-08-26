import { ServiceCategory } from 'src/service-category/entities/service-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare imageUrl: string;

  @Column({
    type: 'longtext',
  })
  declare title: string;

  @Column({
    type: 'longtext',
  })
  declare description: string;

  @Column()
  declare slug: string;

  @ManyToOne(() => ServiceCategory, (ServiceCategory) => ServiceCategory.blog, {
    nullable: true,
  })
  declare servicecategory: ServiceCategory | null;
  @CreateDateColumn()
  declare createdAt: Date;

  @UpdateDateColumn()
  declare updatedAt: Date;
}
