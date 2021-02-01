import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import Medicine from '../infra/typeorm/entities/Medicine';
import ICreateMedicineDTO from '../dtos/ICreateMedicineDTO';

interface IFindMedicines {
  id: string;
}

export interface IFindMedicinesByName {
  name: string;
}

export default interface IMedicinesRepository {
  create(data: ICreateMedicineDTO): Promise<Medicine>;
  findByName(name: string): Promise<Medicine | undefined>;
  findById(id: string): Promise<Medicine | undefined>;
  findAllById(medicines: IFindMedicines[]): Promise<Medicine[]>;
  findAllByName(medicines: IFindMedicinesByName[]): Promise<Medicine[]>;
  findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined>;
  save(medicine: Medicine): Promise<Medicine>;
  remove(medicine: Medicine): Promise<void>;
}
