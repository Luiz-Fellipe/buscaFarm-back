import IMedicinesRepository from '@module/medicines/repositories/IMedicinesRepository';
import Pharmacie from '@module/pharmacies/infra/typeorm/entities/Pharmacie';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICreatePharmacieDTO from '../dtos/ICreatePharmacieDTO';
import IPharmaciesRepository from '../repositories/IPharmaciesRepository';

@injectable()
class CreatePharmacieService {
  constructor(
    @inject('PharmacieRepository')
    private pharmacieRepository: IPharmaciesRepository,
    @inject('MedicinesRepository')
    private medicineRepository: IMedicinesRepository,
  ) {}

  public async execute({
    company_name,
    cnpj,
    city,
    uf,
    neighborhood,
    street,
    adress_number,
    zip_code,
    complement,
    latitude,
    longitude,
    phone,
    medicines,
  }: ICreatePharmacieDTO): Promise<Pharmacie> {
    const checkPharmacieExists = await this.pharmacieRepository.findByCnpj(
      cnpj,
    );

    if (checkPharmacieExists) {
      throw new AppError('Cnpj already registered in our database');
    }

    const medicinesIds = medicines.map(medicine => {
      return { id: medicine.medicine_id };
    });

    const medicinesData = await this.medicineRepository.findAllById(
      medicinesIds,
    );

    const medicinesFinal = medicinesData.map(medicine => {
      const medicineFinal = medicines.find(
        medicineFind => medicineFind.medicine_id === medicine.id,
      );

      if (!medicineFinal) {
        throw new AppError('Medicine not found');
      }

      return {
        medicine_id: medicineFinal.medicine_id,
        price: medicineFinal.price || 0,
        amount: medicineFinal.amount || 0,
      };
    });

    const newPharmacie = this.pharmacieRepository.create({
      company_name,
      cnpj,
      city,
      uf,
      neighborhood,
      street,
      adress_number,
      zip_code,
      complement,
      latitude,
      longitude,
      phone,
      medicines: medicinesFinal,
    });

    return newPharmacie;
  }
}

export default CreatePharmacieService;
