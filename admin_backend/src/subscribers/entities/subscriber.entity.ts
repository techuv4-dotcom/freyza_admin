import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('subscribers')
export class Subscriber {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare email: string;

  @Column({ nullable: true })
  declare created_at: Date;
}
