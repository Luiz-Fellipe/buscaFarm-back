import ICreatePharmacieMedicineDTO from '@module/budgets/dtos/ICreatePharmacieMedicineDTO';
import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import PharmaciesMedicines from '../infra/typeorm/entities/PharmaciesMedicines';

export default interface IPharmaciesMedicinesRepository {
  create(data: ICreatePharmacieMedicineDTO): Promise<void>;
  // findByCnpj(cnpj: string): Promise<Pharmacie | undefined>;
  findByMedicine(
    medicine_id: string,
    pharmacie_id: string,
  ): Promise<PharmaciesMedicines | undefined>;
  findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined>;
  save(pharmacieMedicine: PharmaciesMedicines): Promise<PharmaciesMedicines>;
}
