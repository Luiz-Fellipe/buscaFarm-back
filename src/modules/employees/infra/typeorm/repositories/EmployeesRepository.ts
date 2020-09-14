import { getRepository, Repository, Like, SelectQueryBuilder } from 'typeorm';
import IEmployeesRepository from '@module/employees/repositories/IEmployeesRepository';
import ICreateAppointmentDTO from '@module/employees/dtos/ICreateEmployeeDTO';
import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import User from '@module/users/infra/typeorm/entities/User';
import Employee from '../entities/Employee';

class EmployeesRepository implements IEmployeesRepository {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  public async findByEmail(email: string): Promise<Employee | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findByUserId(user_id: string): Promise<Employee | undefined> {
    const user = await this.ormRepository.findOne({
      where: { user_id },
    });

    return user;
  }

  public async findById(id: string): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne(id);

    delete employee.user.password;

    return employee;
  }

  public async findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined> {
    const [result, total] = await this.ormRepository
      .createQueryBuilder('employees')
      .innerJoinAndSelect('employees.user', 'user')
      .innerJoinAndSelect('employees.employee_position', 'employee_position')
      .where(`user.name ILIKE '%${search}%'`)
      .offset(pageStart)
      .limit(pageLength)
      .getManyAndCount();

    return { data: result, count: total } || undefined;
  }

  public async create({
    user_id,
    pharmacie_id,
    employee_position_id,
  }: ICreateAppointmentDTO): Promise<Employee> {
    const employee = this.ormRepository.create({
      user_id,
      pharmacie_id,
      employee_position_id,
    });

    await this.ormRepository.save(employee);

    return employee;
  }

  public async save(employee: Employee): Promise<Employee> {
    return this.ormRepository.save(employee);
  }
}

export default EmployeesRepository;
