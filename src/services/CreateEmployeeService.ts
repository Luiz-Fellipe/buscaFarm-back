import { getRepository } from 'typeorm';

import Employee from '../models/Employee';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  employee_position_id: string;
  pharmacie_id: string;
}

class CreateEmployeeService {
  public async execute({
    user_id,
    employee_position_id,
    pharmacie_id,
  }: Request): Promise<Employee> {
    const employeeRepository = getRepository(Employee);

    const checkEmployeeExists = await employeeRepository.findOne({
      where: { user_id },
    });

    if (checkEmployeeExists) {
      throw new AppError('This employee is already registered in our database');
    }

    const newEmployee = employeeRepository.create({
      user_id,
      employee_position_id,
      pharmacie_id,
    });

    await employeeRepository.save(newEmployee);

    return newEmployee;
  }
}

export default CreateEmployeeService;
