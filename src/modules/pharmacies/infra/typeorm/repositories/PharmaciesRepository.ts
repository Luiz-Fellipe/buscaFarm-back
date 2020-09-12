import { getRepository, Repository, Like } from 'typeorm';
import IPharmaciesRepository from '@module/pharmacies/repositories/IPharmaciesRepository';
import ICreatePharmacieDTO from '@module/pharmacies/dtos/ICreatePharmacieDTO';
import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import Pharmacie from '../entities/Pharmacie';

class PharmaciesRepository implements IPharmaciesRepository {
  private ormRepository: Repository<Pharmacie>;

  constructor() {
    this.ormRepository = getRepository(Pharmacie);
  }

  public async findByCnpj(cnpj: string): Promise<Pharmacie | undefined> {
    const pharmacie = await this.ormRepository.findOne({
      where: { cnpj },
    });

    return pharmacie;
  }

  public async findById(id: string): Promise<Pharmacie | undefined> {
    const pharmacie = await this.ormRepository.findOne(id);

    return pharmacie;
  }

  public async findWithPagination({
    pageStart,
    pageLenght,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: { name: Like(`%${search}%`) },
      take: pageStart,
      skip: pageLenght,
    });

    return { data: result, count: total } || undefined;
  }

  public async create({
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
    const pharmacie = this.ormRepository.create({
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

    await this.ormRepository.save(pharmacie);

    return pharmacie;
  }
}

export default PharmaciesRepository;
