import { getRepository } from 'typeorm';
import EmployeePosition from '../models/EmployeePosition';

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
      throw new Error('This position has already been registered');
    }

    const newEmployeePosition = employeePositionRepository.create({
      name,
    });

    await employeePositionRepository.save(newEmployeePosition);

    return newEmployeePosition;
  }
}

export default CreateEmployeePositionService;
