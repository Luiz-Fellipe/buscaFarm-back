import { getRepository } from 'typeorm';
import EmployeePosition from '../models/EmployeePosition';
import AppError from '../errors/AppError';

interface Request {
  name: string;
}

class CreateEmployeePositionService {
  public async execute({ name }: Request): Promise<EmployeePosition> {
    const employeePositionRepository = getRepository(EmployeePosition);

    const checkemployeePositionExists = await employeePositionRepository.findOne(
      {
        where: { name },
      },
    );

    if (checkemployeePositionExists) {
      throw new AppError('This position has already been registered');
    }

    const newEmployeePosition = employeePositionRepository.create({
      name,
    });

    await employeePositionRepository.save(newEmployeePosition);

    return newEmployeePosition;
  }
}

export default CreateEmployeePositionService;
