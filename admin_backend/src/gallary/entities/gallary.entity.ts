import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gallery')
export class Gallery {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare imageUrl: string;

  @Column()
  declare type: string;
}
