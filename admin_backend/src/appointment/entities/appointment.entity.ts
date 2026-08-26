import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointment_table')
export class Appointment {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: string;

  @Column()
  declare phone: string;

  @Column({ name: 'Email' })
  declare email: string;

  @Column()
  declare service_id: number;

  @Column()
  declare service_name: string;

  @Column({ type: 'date' })
  declare date: string;

  @Column({ type: 'time' })
  declare time: string;

  @Column({ type: 'text', nullable: true })
  declare notes: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  declare booked_at: Date;
}
