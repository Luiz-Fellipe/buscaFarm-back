import { getRepository, Repository, Like } from 'typeorm';
import IEmployeesPositionRepository from '@module/employeesPosition/repositories/IEmployeesPositionRepository';
import ICreateEmployeePositionDTO from '@module/employeesPosition/dtos/ICreateEmployeePositionDTO';
import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import EmployeePosition from '../entities/EmployeePosition';

class EmployeesPositionRepository implements IEmployeesPositionRepository {
  private ormRepository: Repository<EmployeePosition>;

  constructor() {
    this.ormRepository = getRepository(EmployeePosition);
  }

  public async findByName(name: string): Promise<EmployeePosition | undefined> {
    const employeePosition = await this.ormRepository.findOne({
      where: { name },
    });

    return employeePosition;
  }

  public async findById(id: string): Promise<EmployeePosition | undefined> {
    const employeePosition = await this.ormRepository.findOne(id);

    return employeePosition;
  }

  public async findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: `name ILIKE '%${search}%'`,
      skip: pageStart,
      take: pageLength,
    });

    return { data: result, count: total } || undefined;
  }

  public async create({
    name,
  }: ICreateEmployeePositionDTO): Promise<EmployeePosition> {
    const employee = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(employee);

    return employee;
  }
}

export default EmployeesPositionRepository;
