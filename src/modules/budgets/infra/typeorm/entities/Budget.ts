import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import User from '@module/users/infra/typeorm/entities/User';
import Pharmacie from '@module/pharmacies/infra/typeorm/entities/Pharmacie';
import { Exclude } from 'class-transformer';
import BudgetsMedicines from './BudgetsMedicines';

@Entity('budgets')
class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  user_id: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  @Exclude()
  pharmacie_id: string;

  @OneToOne(() => Pharmacie, { eager: true })
  @JoinColumn({ name: 'pharmacie_id' })
  pharmacie: Pharmacie;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  value: Number;

  @OneToMany(
    () => BudgetsMedicines,
    budgets_medicines => budgets_medicines.budget,
    { cascade: true, eager: true },
  )
  budgets_medicines: BudgetsMedicines[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Budget;
