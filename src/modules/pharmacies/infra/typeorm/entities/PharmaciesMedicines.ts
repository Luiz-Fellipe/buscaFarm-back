import Medicine from '@module/medicines/infra/typeorm/entities/Medicine';
import { Expose, Exclude } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Pharmacie from './Pharmacie';

@Entity('pharmacies_medicines')
class PharmaciesMedicines {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Medicine, medicine => medicine.pharmacies_medicines)
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  @ManyToOne(() => Pharmacie, pharmacie => pharmacie.pharmacies_medicines)
  @JoinColumn({ name: 'pharmacie_id' })
  pharmacie: Pharmacie;

  @Column()
  @Exclude()
  medicine_id: string;

  @Column()
  @Exclude()
  pharmacie_id: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: Number;

  @Column('integer')
  amount: Number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PharmaciesMedicines;
