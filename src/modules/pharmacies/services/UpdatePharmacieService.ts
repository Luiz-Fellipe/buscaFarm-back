import IMedicinesRepository from '@module/medicines/repositories/IMedicinesRepository';
import Pharmacie from '@module/pharmacies/infra/typeorm/entities/Pharmacie';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICreatePharmacieDTO from '../dtos/ICreatePharmacieDTO';
import IUpdatePharmacieDTO from '../dtos/IUpdatePharmacieDTO';
import IPharmaciesRepository from '../repositories/IPharmaciesRepository';

@injectable()
class UpdatePharmacieService {
  constructor(
    @inject('PharmacieRepository')
    private pharmacieRepository: IPharmaciesRepository,
    @inject('MedicinesRepository')
    private medicineRepository: IMedicinesRepository,
  ) {}

  public async execute({
    pharmacieId,
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
  }: IUpdatePharmacieDTO): Promise<Pharmacie> {
    const pharmacie = await this.pharmacieRepository.findById(pharmacieId);

    if (!pharmacie) {
      throw new AppError('Id already registered in our database');
    }

    pharmacie.company_name = company_name;
    pharmacie.cnpj = cnpj;
    pharmacie.complement = complement;
    pharmacie.city = city;
    pharmacie.uf = uf;
    pharmacie.neighborhood = neighborhood;
    pharmacie.street = street;
    pharmacie.adress_number = adress_number;
    pharmacie.zip_code = zip_code;
    pharmacie.latitude = latitude;
    pharmacie.longitude = longitude;
    pharmacie.phone = phone;

    return this.pharmacieRepository.save(pharmacie);
  }
}

export default UpdatePharmacieService;
