import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('home')
export class Home {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare bannerUrl: string;

  @Column()
  declare subBannerUrl: string;

  @Column({
    type: 'longtext',
  })
  declare title: string;

  @Column({
    type: 'longtext',
  })
  declare description: string;

  @Column({
    type: 'longtext',
  })
  declare subHeading: string;

  @Column({
    type: 'longtext',
  })
  declare subDescription: string;
}
