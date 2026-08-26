import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface TeamMember {
  imageUrl: string;
  name: string;
  experience: string;
  about: string;
  position: string;
}

@Entity('about')
export class About {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare bannerUrl: string;

  @Column()
  declare title: string;

  @Column({
    type: 'longtext',
  })
  declare description: string;

  @Column('simple-array')
  declare sliderImagesUrl: string[];

  @Column({
    type: 'json',
  })
  declare teamMembers: TeamMember[];
}
