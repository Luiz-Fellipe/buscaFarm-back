import { getRepository, Repository, Like } from 'typeorm';

import IPharmaciesRepository from '@module/pharmacies/repositories/IPharmaciesRepository';
import ICreatePharmacieDTO from '@module/pharmacies/dtos/ICreatePharmacieDTO';
import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import Pharmacie from '../entities/Pharmacie';

interface IMedicine {
  id: string;
  quantity: number;
  amount: number;
}

interface IRequest {
  customer_id: string;
  products: IMedicine[];
}

class PharmaciesRepository implements IPharmaciesRepository {
  private ormRepository: Repository<Pharmacie>;

  constructor() {
    this.ormRepository = getRepository(Pharmacie);
  }

  public async findByCnpj(cnpj: string): Promise<Pharmacie | undefined> {
    const pharmacie = await this.ormRepository.findOne({
      where: { cnpj },
    });

    return pharmacie;
  }

  public async findById(id: string): Promise<Pharmacie | undefined> {
    const pharmacie = await this.ormRepository.findOne(id);

    return pharmacie;
  }

  public async findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined> {
    const [result, total] = await this.ormRepository
      .createQueryBuilder('pharmacies')
      .leftJoinAndSelect(
        'pharmacies.pharmacies_medicines',
        'pharmacies_medicines',
      )
      .leftJoinAndSelect('pharmacies_medicines.medicine', 'medicines')
      .where(`company_name ILIKE '%${search}%'`)
      .offset(pageStart)
      .limit(pageLength)
      .getManyAndCount();

    // const [result, total] = await this.ormRepository.findAndCount({
    //   where: `company_name ILIKE '%${search}%'`,
    //   skip: pageStart,
    //   take: pageLength,
    // });

    return { data: result, count: total } || undefined;
  }

  public async create({
    company_name,
    cnpj,
    city,
    uf,
    neighborhood,
    street,
    adress_number,
    zip_code,
    complement,
    latitude,
    longitude,
    phone,
    medicines,
  }: ICreatePharmacieDTO): Promise<Pharmacie> {
    const pharmacie = this.ormRepository.create({
      company_name,
      cnpj,
      city,
      uf,
      neighborhood,
      street,
      adress_number,
      zip_code,
      complement,
      latitude,
      longitude,
      phone,
      pharmacies_medicines: medicines,
    });

    await this.ormRepository.save(pharmacie);

    return pharmacie;
  }

  public async remove(pharmacie: Pharmacie): Promise<void> {
    await this.ormRepository.remove(pharmacie);
  }

  public async save(pharmacie: Pharmacie): Promise<Pharmacie> {
    return this.ormRepository.save(pharmacie);
  }
}

export default PharmaciesRepository;
