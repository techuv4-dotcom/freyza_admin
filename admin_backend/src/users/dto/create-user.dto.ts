import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateUserDto {
  @Column()
  declare name: string;

  @Column()
  declare email: string;

  @Column()
  declare password: string;

  @Column()
  declare role: string;
}
