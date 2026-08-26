import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ServiceCategory } from './service-category.entity';

@Entity('service_Category_Headings')
export class ServiceCategoryHeading {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare heading: string;

  @Column({
    type: 'longtext',
  })
  declare description: string;

  @ManyToOne(
    () => ServiceCategory,
    (ServiceCategory) => ServiceCategory.headings,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  declare serviceCategory: ServiceCategory;
}
