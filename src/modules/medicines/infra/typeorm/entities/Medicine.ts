import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import uploadConfig from '@config/upload';

import { Expose } from 'class-transformer';
import PharmaciesMedicines from '@module/pharmacies/infra/typeorm/entities/PharmaciesMedicines';
import BudgetsMedicines from '@module/budgets/infra/typeorm/entities/BudgetsMedicines';

@Entity('medicines')
class Medicine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  manufacturer: string;

  @Column()
  register: string;

  @OneToMany(
    () => BudgetsMedicines,
    budgets_medicines => budgets_medicines.medicine,
    { cascade: true, eager: true },
  )
  budgets_medicines: BudgetsMedicines[];

  // @Column()
  // price: Number;

  // @Column()
  // amount: Number;

  // @Column({ select: false })
  // @Exclude()
  // pharmacie_id: string;

  // @OneToOne(() => Pharmacie, { eager: true })
  // @JoinColumn({ name: 'pharmacie_id' })
  // pharmacie: Pharmacie;

  @OneToMany(
    () => PharmaciesMedicines,
    pharmacies_medicines => pharmacies_medicines.medicine,
    { cascade: true, eager: true },
  )
  pharmacies_medicines: PharmaciesMedicines[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getAvatarUrl(): string | null {
    if (!this.image) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image}`;
        break;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.image}`;
        break;

      default:
        return null;
        break;
    }
  }
}

export default Medicine;
