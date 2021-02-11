import Pharmacie from '@module/pharmacies/infra/typeorm/entities/Pharmacie';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import { IUpdateMedicineDTO } from '../dtos/IUpdatePharmacieMedicineDTO';
import PharmaciesMedicines from '../infra/typeorm/entities/PharmaciesMedicines';
import IPharmaciesMedicinesRepository from '../repositories/IPharmaciesMedicinesRepository';
import IPharmaciesRepository from '../repositories/IPharmaciesRepository';

@injectable()
class UpdatePharmacieMedicinesService {
  constructor(
    @inject('PharmacieRepository')
    private pharmacieRepository: IPharmaciesRepository,
    @inject('PharmaciesMedicinesRepository')
    private pharmaciesMedicinesRepository: IPharmaciesMedicinesRepository,
  ) {}

  public async execute({
    medicine_id,
    pharmacie_id,
    price,
    amount,
  }: IUpdateMedicineDTO): Promise<PharmaciesMedicines> {
    const pharmacieMedicine = await this.pharmaciesMedicinesRepository.findByMedicine(
      medicine_id,
      pharmacie_id,
    );

    if (!pharmacieMedicine) {
      throw new AppError('Id already registered in our database');
    }

    pharmacieMedicine.amount = amount;
    pharmacieMedicine.price = price;

    return this.pharmaciesMedicinesRepository.save(pharmacieMedicine);
  }
}

export default UpdatePharmacieMedicinesService;
