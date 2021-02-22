import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IPharmaciesMedicinesRepository from '../repositories/IPharmaciesMedicinesRepository';

interface Request {
  id: string;
}

@injectable()
class DeletePharmacieMedicinesService {
  constructor(
    @inject('PharmaciesMedicinesRepository')
    private pharmaciesMedicinesRepository: IPharmaciesMedicinesRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const pharmacie = await this.pharmaciesMedicinesRepository.findById(id);

    if (!pharmacie) {
      throw new AppError('This medicine does not exist in pharmacie');
    }

    await this.pharmaciesMedicinesRepository.remove(pharmacie);
  }
}

export default DeletePharmacieMedicinesService;
