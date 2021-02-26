import { getRepository, Repository, Like } from 'typeorm';

import IPharmaciesMedicinesRepository from '@module/pharmacies/repositories/IPharmaciesMedicinesRepository';
import ICreatePharmacieDTO from '@module/pharmacies/dtos/ICreatePharmacieDTO';
import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import Pharmacie from '../entities/Pharmacie';
import PharmaciesMedicines from '../entities/PharmaciesMedicines';

interface IMedicine {
  id: string;
  quantity: number;
  amount: number;
}

interface IRequest {
  customer_id: string;
  products: IMedicine[];
}

class PharmaciesMedicinesRepository implements IPharmaciesMedicinesRepository {
  private ormRepository: Repository<PharmaciesMedicines>;

  constructor() {
    this.ormRepository = getRepository(PharmaciesMedicines);
  }

  // public async findByCnpj(cnpj: string): Promise<Pharmacie | undefined> {
  //   const pharmacie = await this.ormRepository.findOne({
  //     where: { cnpj },
  //   });

  //   return pharmacie;
  // }

  // public async findById(id: string): Promise<Pharmacie | undefined> {
  //   const pharmacie = await this.ormRepository.findOne(id);

  //   return pharmacie;
  // }

  public async findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined> {
    const [result, total] = await this.ormRepository
      .createQueryBuilder('pharmacies_medicines')
      .innerJoinAndSelect('pharmacies_medicines.medicine', 'medicines')
      .innerJoinAndSelect('pharmacies_medicines.pharmacie', 'pharmacies')
      .where(`medicines.name ILIKE '%${search}%'`)
      .orWhere(`pharmacies.company_name ILIKE '%${search}%'`)
      .skip(pageStart)
      .take(pageLength)
      .getManyAndCount();

    return { data: result, count: total } || undefined;
  }

  // public async create({
  //   company_name,
  //   cnpj,
  //   city,
  //   uf,
  //   neighborhood,
  //   street,
  //   adress_number,
  //   zip_code,
  //   complement,
  //   latitude,
  //   longitude,
  //   phone,
  //   medicines,
  // }: ICreatePharmacieDTO): Promise<Pharmacie> {
  //   const pharmacie = this.ormRepository.create({
  //     company_name,
  //     cnpj,
  //     city,
  //     uf,
  //     neighborhood,
  //     street,
  //     adress_number,
  //     zip_code,
  //     complement,
  //     latitude,
  //     longitude,
  //     phone,
  //     pharmacies_medicines: medicines,
  //   });

  //   await this.ormRepository.save(pharmacie);

  //   return pharmacie;
  // }
}

export default PharmaciesMedicinesRepository;
