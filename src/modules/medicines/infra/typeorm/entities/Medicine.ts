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

import Pharmacie from '@module/pharmacies/infra/typeorm/entities/Pharmacie';
import { Exclude, Expose } from 'class-transformer';

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
  price: Number;

  @Column()
  amount: Number;

  @Column({ select: false })
  @Exclude()
  pharmacie_id: string;

  @OneToOne(() => Pharmacie, { eager: true })
  @JoinColumn({ name: 'pharmacie_id' })
  pharmacie: Pharmacie;

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
