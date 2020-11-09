import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import Pharmacie from '../infra/typeorm/entities/Pharmacie';
import ICreatePharmacieDTO from '../dtos/ICreatePharmacieDTO';

export default interface IPharmaciesRepository {
  create(data: ICreatePharmacieDTO): Promise<Pharmacie>;
  findByCnpj(cnpj: string): Promise<Pharmacie | undefined>;
  findById(id: string): Promise<Pharmacie | undefined>;
  findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined>;
  remove(pharmacie: Pharmacie): Promise<void>;
}
