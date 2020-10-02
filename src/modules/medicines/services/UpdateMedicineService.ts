import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IMedicinesRepository from '../repositories/IMedicinesRepository';
import IUpdateMedicineDTO from '../dtos/IUpdateMedicineDTO';
import Medicine from '../infra/typeorm/entities/Medicine';

@injectable()
class UpdateMedicineService {
  constructor(
    @inject('MedicinesRepository')
    private medicineRepository: IMedicinesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    amount,
    id,
    manufacturer,
    price,
  }: IUpdateMedicineDTO): Promise<Medicine> {
    const medicine = await this.medicineRepository.findById(id);

    if (!medicine) {
      throw new AppError('This medicine is not registered in our database');
    }

    medicine.amount = amount;
    medicine.name = name;
    medicine.manufacturer = manufacturer;
    medicine.price = price;

    return this.medicineRepository.save(medicine);
  }
}

export default UpdateMedicineService;
