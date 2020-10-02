import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IMedicinesRepository from '../repositories/IMedicinesRepository';

interface IRequest {
  medicine_id: string;
  medicineFileName: string;
}

@injectable()
class UpdateImageMedicineService {
  constructor(
    @inject('MedicinesRepository')
    private medicinesRepository: IMedicinesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    medicine_id,
    medicineFileName,
  }: IRequest): Promise<String> {
    const medicine = await this.medicinesRepository.findById(medicine_id);

    if (!medicine) {
      throw new AppError('This medicine is not registered in our database');
    }
    if (medicine.image) {
      await this.storageProvider.deleteFile(medicine.image);
    }

    const filename = await this.storageProvider.saveFile(medicineFileName);

    medicine.image = filename;
    await this.medicinesRepository.save(medicine);

    return filename;
  }
}

export default UpdateImageMedicineService;
