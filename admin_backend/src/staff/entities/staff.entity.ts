import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare profileUrl: string;

  @Column()
  declare name: string;

  @Column()
  declare email: string;

  @Column()
  declare phone: string;

  @Column()
  declare gender: string;

  @Column({ type: 'date', nullable: true })
  declare dob: Date;

  @Column()
  declare designation: string;

  // @Column()
  // declare userId:string

  @Column()
  declare password: string;

  @Column()
  declare experience: string;

  @Column({ type: 'date', nullable: true })
  declare joiningDate: Date;

  @Column({ nullable: true })
  declare salary: string;

  @Column({ default: true })
  declare status: boolean;

  @Column()
  declare address: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: true })
  declare role: Role;
}
