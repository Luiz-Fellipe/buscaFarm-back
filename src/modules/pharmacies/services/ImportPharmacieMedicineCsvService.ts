import IMedicinesRepository from '@module/medicines/repositories/IMedicinesRepository';
import Pharmacie from '@module/pharmacies/infra/typeorm/entities/Pharmacie';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IImportPharmacieMedicineDTO from '../dtos/IImportPharmacieMedicineDTO';
import IPharmaciesMedicinesRepository from '../repositories/IPharmaciesMedicinesRepository';
import IPharmaciesRepository from '../repositories/IPharmaciesRepository';

@injectable()
class ImportPharmacieMedicineCsvService {
  constructor(
    @inject('PharmacieRepository')
    private pharmacieRepository: IPharmaciesRepository,
    @inject('MedicinesRepository')
    private medicineRepository: IMedicinesRepository,
    @inject('PharmaciesMedicinesRepository')
    private pharmaciesMedicinesRepository: IPharmaciesMedicinesRepository,
  ) {}

  public async execute({
    pharmacieId,
    medicines,
  }: IImportPharmacieMedicineDTO): Promise<void> {
    const pharmacie = await this.pharmacieRepository.findById(pharmacieId);

    if (!pharmacie) {
      throw new AppError('Pharmacie not found');
    }

    const medicinesNames = medicines.map(medicine => {
      return { name: medicine.name.toLowerCase() };
    });

    const medicinesData = await this.medicineRepository.findAllByName(
      medicinesNames,
    );

    const medicinesFinal = medicinesData.map(async medicine => {
      const medicineFinal = medicines.find(
        medicineFind => medicineFind.name === medicine.name,
      );

      if (!medicineFinal) {
        throw new AppError('Medicine not found');
      }

      const medicineExistInPharmacie = await this.pharmaciesMedicinesRepository.findByMedicine(
        medicine.id,
        pharmacieId,
      );

      if (medicineExistInPharmacie) {
        medicineExistInPharmacie.amount =
          Number(medicineExistInPharmacie.amount) +
          Number(medicineFinal.amount);
        medicineExistInPharmacie.price = Number(medicineFinal.price);

        this.pharmaciesMedicinesRepository.save(medicineExistInPharmacie);
      } else {
        await this.pharmaciesMedicinesRepository.create({
          amount: Number(medicineFinal.amount),
          price: Number(medicineFinal.price),
          pharmacie_id: pharmacieId,
          medicine_id: medicine.id,
        });
      }
    });

    await Promise.all(medicinesFinal);
  }
}

export default ImportPharmacieMedicineCsvService;
