import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import IPharmaciesRepository from '../repositories/IPharmaciesRepository';

interface Request {
  id: string;
}

@injectable()
class DeletePharmacieService {
  constructor(
    @inject('PharmacieRepository')
    private pharmaciesRepository: IPharmaciesRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const pharmacie = await this.pharmaciesRepository.findById(id);

    if (!pharmacie) {
      throw new AppError('This Pharmacie does not exist');
    }

    await this.pharmaciesRepository.remove(pharmacie);
  }
}

export default DeletePharmacieService;
