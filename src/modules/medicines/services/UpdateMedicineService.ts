import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';

import IMedicinesRepository from '../repositories/IMedicinesRepository';
import IUpdateMedicineDTO from '../dtos/IUpdateMedicineDTO';
import Medicine from '../infra/typeorm/entities/Medicine';

@injectable()
class UpdateMedicineService {
  constructor(
    @inject('MedicinesRepository')
    private medicineRepository: IMedicinesRepository,
  ) {}

  public async execute({
    name,
    id,
    manufacturer,
    register,
  }: IUpdateMedicineDTO): Promise<Medicine> {
    const medicine = await this.medicineRepository.findById(id);

    if (!medicine) {
      throw new AppError('This medicine is not registered in our database');
    }

    medicine.name = name;
    medicine.manufacturer = manufacturer;
    medicine.register = register;

    return this.medicineRepository.save(medicine);
  }
}

export default UpdateMedicineService;
