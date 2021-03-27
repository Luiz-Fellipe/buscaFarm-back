import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import Pharmacie from '../infra/typeorm/entities/Pharmacie';
import ICreatePharmacieDTO from '../dtos/ICreatePharmacieDTO';
// import IUpdatePharmacieMedicineDTO from '../dtos/IUpdatePharmacieMedicineDTO';

export default interface IPharmaciesRepository {
  create(data: ICreatePharmacieDTO): Promise<Pharmacie>;
  // updateMedicines(data: IUpdatePharmacieMedicineDTO): Promise<Pharmacie>;
  findByCnpj(cnpj: string): Promise<Pharmacie | undefined>;
  findByIdWithRelations(id: string): Promise<Pharmacie | undefined>;
  findById(id: string): Promise<Pharmacie | undefined>;
  findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined>;
  remove(pharmacie: Pharmacie): Promise<void>;
  save(pharmacie: Pharmacie): Promise<Pharmacie>;
}
