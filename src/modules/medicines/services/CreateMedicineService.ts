import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICreateMedicineDTO from '../dtos/ICreateMedicineDTO';
import Medicine from '../infra/typeorm/entities/Medicine';
import IMedicinesRepository from '../repositories/IMedicinesRepository';

@injectable()
class CreateMedicineService {
  constructor(
    @inject('MedicinesRepository')
    private medicinesRepository: IMedicinesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    register,
    manufacturer,
  }: ICreateMedicineDTO): Promise<Medicine> {
    const existMedicine = await this.medicinesRepository.findByName(name);

    if (existMedicine) {
      throw new AppError('This medicine already exists in our database');
    }

    const newMedicine = this.medicinesRepository.create({
      name,
      register,
      manufacturer,
    });

    return newMedicine;
  }
}

export default CreateMedicineService;
