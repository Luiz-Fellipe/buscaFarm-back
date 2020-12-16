import Medicine from '@module/medicines/infra/typeorm/entities/Medicine';
import { Exclude } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Budget from './Budget';

@Entity('budgets_medicines')
class BudgetsMedicines {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Medicine, medicine => medicine.budgets_medicines)
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  @ManyToOne(() => Budget, budget => budget.budgets_medicines)
  @JoinColumn({ name: 'budget_id' })
  budget: Budget;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: Number;

  @Column('integer')
  amount: Number;

  @Column()
  @Exclude()
  medicine_id: string;

  @Column()
  @Exclude()
  budget_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BudgetsMedicines;
