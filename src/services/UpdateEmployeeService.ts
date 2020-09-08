import { getRepository } from 'typeorm';

import Employee from '../models/Employee';
import AppError from '../errors/AppError';

interface Request {
  employee_id: string;
  employee_position_id: string;
}

class UpdateEmployeeService {
  public async execute({
    employee_position_id,
    employee_id,
  }: Request): Promise<Employee> {
    const employeeRepository = getRepository(Employee);

    const employee = await employeeRepository.findOne({
      where: { id: employee_id },
    });

    if (!employee) {
      throw new AppError('This employee is not registered in our database');
    }

    employee.employee_position_id = employee_position_id;

    return employeeRepository.save(employee);
  }
}

export default UpdateEmployeeService;
