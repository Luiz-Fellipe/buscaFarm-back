import { getRepository, In, Repository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import ICreateMedicineDTO from '@module/medicines/dtos/ICreateMedicineDTO';
import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import IMedicinesRepository, {
  IFindMedicinesByRegister,
} from '@module/medicines/repositories/IMedicinesRepository';
import Medicine from '../entities/Medicine';

interface IFindMedicines {
  id: string;
}

class MedicinesRepository implements IMedicinesRepository {
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

  public async findAllById(medicines: IFindMedicines[]): Promise<Medicine[]> {
    const idList = medicines.map(medicine => medicine.id);

    const orderList = await this.ormRepository.find({ id: In(idList) });
    if (idList.length !== orderList.length) {
      throw new AppError('Missing Medicine');
    }

    return orderList;
  }

  public async findAllByRegister(
    medicines: IFindMedicinesByRegister[],
  ): Promise<Medicine[]> {
    const registerList = medicines.map(medicine => medicine.register);

    const orderList = await this.ormRepository
      .createQueryBuilder('medicines')
      .where('medicines.register IN (:...registers)', {
        registers: registerList,
      })
      .getMany();

    // if (nameList.length !== orderList.length) {
    //   throw new AppError('Missing Medicine');
    // }

    return orderList;
  }

  public async findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined> {
    const [result, total] = await this.ormRepository
      .createQueryBuilder('medicines')
      .leftJoinAndSelect(
        'medicines.pharmacies_medicines',
        'pharmacies_medicines',
      )
      .leftJoinAndSelect('pharmacies_medicines.pharmacie', 'pharmacies')
      .where(`name ILIKE '%${search}%'`)
      .skip(pageStart)
      .take(pageLength)
      .getManyAndCount();
    // const [result, total] = await this.ormRepository.findAndCount({
    //   where: `name ILIKE '%${search}%'`,
    //   skip: pageStart,
    //   take: pageLength,
    // });

    return { data: result, count: total } || undefined;
  }

  public async create({
    name,
    manufacturer,
    register,
  }: ICreateMedicineDTO): Promise<Medicine> {
    const medicine = this.ormRepository.create({
      manufacturer,
      name,
      register,
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
