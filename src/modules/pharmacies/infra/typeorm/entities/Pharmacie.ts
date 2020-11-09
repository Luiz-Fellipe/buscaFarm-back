import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import PharmaciesMedicines from './PharmaciesMedicines';

@Entity('pharmacies')
class Pharmacie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column()
  avatar: string;

  @Column()
  cnpj: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  adress_number?: string;

  @Column()
  zip_code: string;

  @Column()
  complement: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  phone?: string;

  @OneToMany(
    () => PharmaciesMedicines,
    pharmacies_medicines => pharmacies_medicines.pharmacie,
    { cascade: true, eager: true },
  )
  pharmacies_medicines: PharmaciesMedicines[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;

      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;

      default:
        return null;
    }
  }
}

export default Pharmacie;
