import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('service_requests')
export class ServiceRequest {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare email: string;

  @Column()
  declare service_name: string;

  @Column({
    default: 'pending',
  })
  declare status: string;

  @CreateDateColumn()
  declare created_at: Date;
}
