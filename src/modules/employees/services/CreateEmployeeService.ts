import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Employee from '@module/employees/infra/typeorm/entities/Employee';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

interface IRequest {
  user_id: string;
  employee_position_id: string;
  pharmacie_id: string;
}

@injectable()
class CreateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({
    user_id,
    employee_position_id,
    pharmacie_id,
  }: IRequest): Promise<Employee> {
    const checkEmployeeExists = await this.employeesRepository.findByUserId(
      user_id,
    );

    if (checkEmployeeExists) {
      throw new AppError('This employee is already registered in our database');
    }

    const newEmployee = await this.employeesRepository.create({
      user_id,
      employee_position_id,
      pharmacie_id,
    });

    return newEmployee;
  }
}

export default CreateEmployeeService;
