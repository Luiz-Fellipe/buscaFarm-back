import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import Employee from '../infra/typeorm/entities/Employee';
import ICreateAppointmentDTO from '../dtos/ICreateEmployeeDTO';

export default interface IEmployeesRepository {
  create(data: ICreateAppointmentDTO): Promise<Employee>;
  findByEmail(email: string): Promise<Employee | undefined>;
  findByUserId(user_id: string): Promise<Employee | undefined>;
  findById(id: string): Promise<Employee | undefined>;
  findWithPagination({
    pageStart,
    pageLenght,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined>;
  save(employee: Employee): Promise<Employee>;
}
