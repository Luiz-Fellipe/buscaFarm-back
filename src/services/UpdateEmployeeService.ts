import { getRepository } from 'typeorm';

import Employee from '../models/Employee';

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
      throw new Error('This employee is not registered in our database');
    }

    employee.employee_position_id = employee_position_id;

    return employeeRepository.save(employee);
  }
}

export default UpdateEmployeeService;
