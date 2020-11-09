import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import PharmaciesMedicines from './PharmaciesMedicines';

@Entity('pharmacies')
class Pharmacie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

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
}

export default Pharmacie;
