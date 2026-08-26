import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare module: string;

  @Column()
  declare permission: string;

  @Column()
  declare key: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  declare roles: Role[];
}
