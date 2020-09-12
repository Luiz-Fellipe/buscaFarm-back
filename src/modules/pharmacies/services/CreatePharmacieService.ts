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
  }: ICreatePharmacieDTO): Promise<Pharmacie> {
    const checkPharmacieExists = await this.pharmacieRepository.findByCnpj(
      cnpj,
    );

    if (checkPharmacieExists) {
      throw new AppError('Cnpj already registered in our database');
    }

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
    });

    return newPharmacie;
  }
}

export default CreatePharmacieService;
