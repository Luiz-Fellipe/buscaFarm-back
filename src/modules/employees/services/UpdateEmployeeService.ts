import AppError from '@shared/errors/AppError';
import Employee from '@module/employees/infra/typeorm/entities/Employee';
import { injectable, inject } from 'tsyringe';
import IEmployeesPositionRepository from '@module/employeesPosition/repositories/IEmployeesPositionRepository';
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
    @inject('EmployeesPositionRepository')
    private employeePositionRepository: IEmployeesPositionRepository,
  ) {}

  public async execute({
    employee_position_id,
    employee_id,
  }: Request): Promise<Employee> {
    const employee = await this.employeeRepository.findById(employee_id);
    const newEmployeePosition = await this.employeePositionRepository.findById(
      employee_position_id,
    );

    if (!employee) {
      throw new AppError('This employee is not registered in our database');
    }

    if (newEmployeePosition) {
      employee.employee_position_id = employee_position_id;
      employee.employee_position = newEmployeePosition;
    }

    return this.employeeRepository.save(employee);
  }
}

export default UpdateEmployeeService;
