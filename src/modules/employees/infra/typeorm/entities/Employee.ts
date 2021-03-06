import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';
import User from '@module/users/infra/typeorm/entities/User';
import EmployeePosition from '@module/employeesPosition/infra/typeorm/entities/EmployeePosition';
import Pharmacie from '@module/pharmacies/infra/typeorm/entities/Pharmacie';
import { Exclude, Expose } from 'class-transformer';

@Entity('employees')
class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  user_id: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ select: false })
  employee_position_id: string;

  @OneToOne(() => EmployeePosition, { eager: true })
  @JoinColumn({ name: 'employee_position_id' })
  employee_position: EmployeePosition;

  @Column({ select: false })
  pharmacie_id: string;

  @OneToOne(() => Pharmacie, { eager: true })
  @JoinColumn({ name: 'pharmacie_id' })
  pharmacie: Pharmacie;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Employee;
