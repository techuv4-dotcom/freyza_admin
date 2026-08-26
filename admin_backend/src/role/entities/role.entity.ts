// import { permission } from "process";
import { Permission } from 'src/permissions/entities/permission.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare role: string;

  @OneToMany(() => Staff, (Staff) => Staff.role)
  declare users: Staff[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions',
  })
  declare permissions: Permission[];
}
