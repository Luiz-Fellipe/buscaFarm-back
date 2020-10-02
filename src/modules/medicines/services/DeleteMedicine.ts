import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IMedicinesRepository from '../repositories/IMedicinesRepository';

interface Request {
  id: string;
}

@injectable()
class DeleteMedicineService {
  constructor(
    @inject('MedicinesRepository')
    private medicinesRepository: IMedicinesRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const medicine = await this.medicinesRepository.findById(id);

    if (!id) {
      throw new AppError('This Medicine does not exist');
    }

    if (medicine) {
      await this.medicinesRepository.remove(medicine);
    }
  }
}

export default DeleteMedicineService;
