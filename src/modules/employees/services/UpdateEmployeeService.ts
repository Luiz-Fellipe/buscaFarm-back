import AppError from '@shared/errors/AppError';
import Employee from '@module/employees/infra/typeorm/entities/Employee';
import { injectable, inject } from 'tsyringe';
import IEmployeeRepository from '../repositories/IEmployeesRepository';

interface Request {
  employee_id: string;
  employee_position_id: string;
}

@injectable()
class UpdateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  public async execute({
    employee_position_id,
    employee_id,
  }: Request): Promise<Employee> {
    const employee = await this.employeeRepository.findById(employee_id);

    if (!employee) {
      throw new AppError('This employee is not registered in our database');
    }

    employee.employee_position_id = employee_position_id;

    return this.employeeRepository.save(employee);
  }
}

export default UpdateEmployeeService;
