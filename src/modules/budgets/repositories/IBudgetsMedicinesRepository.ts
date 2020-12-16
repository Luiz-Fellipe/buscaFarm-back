import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';

export default interface IBudgetsMedicinesRepository {
  // create(data: ICreatePharmacieDTO): Promise<Pharmacie>;
  // findByCnpj(cnpj: string): Promise<Pharmacie | undefined>;
  // findById(id: string): Promise<Pharmacie | undefined>;
  findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined>;
}
