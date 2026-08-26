import { IsNotEmpty } from 'class-validator';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';
// import { ServiceGroup } from "src/service-category/entities/service-group";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('servicces')
export class Servicce {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare imageUrl: string;

  @Column()
  declare name: string;

  @Column()
  declare duration: string;

  @Column('decimal')
  declare price: number;

  @Column('text')
  declare about: string;

  @Column({
    default: true,
  })
  declare activeStatus: boolean;

  @Column({
    type: 'enum',
    enum: ['Male', 'Female'],
  })
  declare group: 'Male' | 'Female';

  @ManyToOne(
    () => ServiceCategory,
    (ServiceCategory) => ServiceCategory.service,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  declare serviceCategory: ServiceCategory;
}
