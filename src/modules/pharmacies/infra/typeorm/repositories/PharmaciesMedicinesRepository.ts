import { getRepository, Repository } from 'typeorm';

import IPharmaciesMedicinesRepository from '@module/pharmacies/repositories/IPharmaciesMedicinesRepository';

import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import ICreatePharmacieMedicineDTO from '@module/budgets/dtos/ICreatePharmacieMedicineDTO';

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

  public async findByMedicine(
    medicine_id: string,
    pharmacie_id: string,
  ): Promise<PharmaciesMedicines | undefined> {
    const result = await this.ormRepository
      .createQueryBuilder('pharmacies_medicines')
      .innerJoinAndSelect('pharmacies_medicines.medicine', 'medicines')
      .innerJoinAndSelect('pharmacies_medicines.pharmacie', 'pharmacies')
      .where(
        `medicines.id ='${medicine_id}' AND pharmacies.id = '${pharmacie_id}'`,
      )
      .getOne();

    return result;
  }

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
      .offset(pageStart)
      .limit(pageLength)
      .getManyAndCount();

    return { data: result, count: total } || undefined;
  }

  public async findMedicinesFromThePharmacyWithPagination({
    pharmacieId,
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined> {
    const [result, total] = await this.ormRepository
      .createQueryBuilder('pharmacies_medicines')
      .innerJoinAndSelect('pharmacies_medicines.medicine', 'medicines')
      .where(`pharmacies_medicines.pharmacie_id = '${pharmacieId}'`)
      .andWhere(`medicines.name ILIKE '%${search}%'`)
      .offset(pageStart)
      .limit(pageLength)
      .getManyAndCount();

    return { data: result, count: total } || undefined;
  }

  public async create({
    pharmacie_id,
    medicine_id,
    amount,
    price,
  }: ICreatePharmacieMedicineDTO): Promise<void> {
    const pharmacieMedicine = this.ormRepository.create({
      pharmacie_id,
      medicine_id,
      amount,
      price,
    });

    await this.ormRepository.save(pharmacieMedicine);
  }

  public async save(
    pharmacieMedicine: PharmaciesMedicines,
  ): Promise<PharmaciesMedicines> {
    return this.ormRepository.save(pharmacieMedicine);
  }
}
//
export default PharmaciesMedicinesRepository;
