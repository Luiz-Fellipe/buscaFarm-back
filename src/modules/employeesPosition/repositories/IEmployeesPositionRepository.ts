import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import EmployeePosition from '../infra/typeorm/entities/EmployeePosition';
import ICreateEmployeePositionDTO from '../dtos/ICreateEmployeePositionDTO';

export default interface IEmployeesPositionRepository {
  create(data: ICreateEmployeePositionDTO): Promise<EmployeePosition>;
  findByName(name: string): Promise<EmployeePosition | undefined>;
  findById(id: string): Promise<EmployeePosition | undefined>;
  findWithPagination({
    pageStart,
    pageLenght,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined>;
}
