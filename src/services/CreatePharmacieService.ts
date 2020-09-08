import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Pharmacie from '../models/Pharmacie';
import AppError from '../errors/AppError';

interface Request {
  company_name: string;
  cnpj: string;
  city: string;
  uf: string;
  neighborhood: string;
  street: string;
  adress_number?: string;
  zip_code: string;
  complement: string;
  latitude: number;
  longitude: number;
  phone?: string;
}

class CreateUserService {
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
  }: Request): Promise<Pharmacie> {
    const pharmacieRepository = getRepository(Pharmacie);

    const checkPharmacieExists = await pharmacieRepository.findOne({
      where: { cnpj },
    });

    if (checkPharmacieExists) {
      throw new AppError('Cnpj already registered in our database');
    }

    const newPharmacie = pharmacieRepository.create({
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

    await pharmacieRepository.save(newPharmacie);

    return newPharmacie;
  }
}

export default CreateUserService;
