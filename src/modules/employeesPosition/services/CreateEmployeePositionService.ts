import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import EmployeePosition from '@module/employeesPosition/infra/typeorm/entities/EmployeePosition';
import IEmployeesPositionRepository from '@module/employeesPosition/repositories/IEmployeesPositionRepository';

interface Request {
  name: string;
}

@injectable()
class CreateEmployeePositionService {
  constructor(
    @inject('EmployeesPositionRepository')
    private employeePositionRepository: IEmployeesPositionRepository,
  ) {}

  public async execute({ name }: Request): Promise<EmployeePosition> {
    const checkemployeePositionExists = await this.employeePositionRepository.findByName(
      name,
    );

    if (checkemployeePositionExists) {
      throw new AppError('This position has already been registered');
    }

    const newEmployeePosition = this.employeePositionRepository.create({
      name,
    });

    return newEmployeePosition;
  }
}

export default CreateEmployeePositionService;
