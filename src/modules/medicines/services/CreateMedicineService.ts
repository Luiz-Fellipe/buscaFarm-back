import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { injectable, inject } from 'tsyringe';
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
    amount,
    manufacturer,
    price,
    pharmacie_id,
  }: ICreateMedicineDTO): Promise<Medicine> {
    const newMedicine = this.medicinesRepository.create({
      name,
      amount,
      manufacturer,
      price,
      pharmacie_id,
    });

    return newMedicine;
  }
}

export default CreateMedicineService;
