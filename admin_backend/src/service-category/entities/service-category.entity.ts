import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ServiceCategoryHeading } from './service_category-headings';
// import { ServiceGroup } from "./service-group";
import { Servicce } from 'src/services/entities/servicce.entity';
import { Blog } from 'src/blog/entities/blog.entity';

@Entity('service_Categorys')
export class ServiceCategory {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: string;

  @Column()
  declare imageUrl: string;

  @Column()
  declare iconUrl: string;

  @Column()
  declare title: string;

  @Column({
    type: 'longtext',
  })
  declare description: string;

  @Column({
    type: 'longtext',
  })
  declare shortDescription: string;

  @Column({
    default: true,
  })
  declare activeStatus: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  declare slug: string;

  @OneToMany(
    () => ServiceCategoryHeading,
    (ServiceCategoryHeading) => ServiceCategoryHeading.serviceCategory,
  )
  declare headings: ServiceCategoryHeading[];

  @OneToMany(() => Blog, (Blog) => Blog.servicecategory)
  declare blog: Blog[];

  @OneToMany(() => Servicce, (Servicce) => Servicce.serviceCategory)
  declare service: Servicce[];
}
