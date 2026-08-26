import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare imageUrl: string;

  @Column()
  declare address: string;

  @Column()
  declare contactNumber: string;

  @Column()
  declare emailAddress: string;

  @Column('json')
  declare openingHours: {
    day: string;
    openingTime: string;
    closingTime: string;
    closed: boolean;
  }[];

  @Column('json')
  declare links: {
    platform: string;
    url: string;
  }[];
}
