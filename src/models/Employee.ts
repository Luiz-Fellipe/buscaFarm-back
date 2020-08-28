import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';
import EmployeePosition from './EmployeePosition';
import Pharmacie from './Pharmacie';

@Entity('employees')
class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ select: false })
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ select: false })
  employee_position_id: string;

  @OneToOne(() => EmployeePosition)
  @JoinColumn({ name: 'employee_position_id' })
  employee_position: EmployeePosition;

  @Column({ select: false })
  pharmacie_id: string;

  @OneToOne(() => Pharmacie)
  @JoinColumn({ name: 'pharmacie_id' })
  pharmacie: Pharmacie;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Employee;
