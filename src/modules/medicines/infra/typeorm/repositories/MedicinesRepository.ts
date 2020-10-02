import { getRepository, Repository } from 'typeorm';
import IEmployeesPositionRepository from '@module/employeesPosition/repositories/IEmployeesPositionRepository';
import ICreateMedicineDTO from '@module/medicines/dtos/ICreateMedicineDTO';
import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import Medicine from '../entities/Medicine';

class MedicinesRepository implements IEmployeesPositionRepository {
  private ormRepository: Repository<Medicine>;

  constructor() {
    this.ormRepository = getRepository(Medicine);
  }

  public async findByName(name: string): Promise<Medicine | undefined> {
    const medicine = await this.ormRepository.findOne({
      where: { name },
    });

    return medicine;
  }

  public async findById(id: string): Promise<Medicine | undefined> {
    const medicine = await this.ormRepository.findOne(id);

    return medicine;
  }

  public async findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: `name ILIKE '%${search}%'`,
      skip: pageStart,
      take: pageLength,
    });

    return { data: result, count: total } || undefined;
  }

  public async create({
    name,
    amount,
    manufacturer,
    pharmacie_id,
    price,
  }: ICreateMedicineDTO): Promise<Medicine> {
    const medicine = this.ormRepository.create({
      amount,
      manufacturer,
      name,
      price,
      pharmacie_id,
    });

    await this.ormRepository.save(medicine);

    return medicine;
  }

  public async save(medicine: Medicine): Promise<Medicine> {
    return this.ormRepository.save(medicine);
  }

  public async remove(medicine: Medicine): Promise<void> {
    await this.ormRepository.remove(medicine);
  }
}

export default MedicinesRepository;
