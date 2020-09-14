import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEmployeePositionService from '@module/employeesPosition/services/CreateEmployeePositionService';

import EmployeesPositionRepository from '../../typeorm/repositories/EmployeesPositionRepository';

export default class EmployeesPositionController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { pageLength, pageStart, search } = req.query as any;

    const employeesPositionRepository = container.resolve(
      EmployeesPositionRepository,
    );

    const employeesPosition = await employeesPositionRepository.findWithPagination(
      { pageStart, pageLength, search },
    );

    return res.json(employeesPosition);
  }

  // public async show(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const employeesRepository = container.resolve(EmployeesRepository);

  //   const employee = await employeesRepository.findById(id);

  //   return res.json({ employee });
  // }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const {
  //     employee_id,
  //     employee_position_id,
  //     name,
  //     email,
  //     password,
  //     old_password,
  //     phone,
  //   } = req.body;

  //   const updateEmployee = container.resolve(UpdateEmployeeService);

  //   const updateUser = container.resolve(UpdateUserService);

  //   const { user_id } = await updateEmployee.execute({
  //     employee_id,
  //     employee_position_id,
  //   });

  //   await updateUser.execute({
  //     user_id,
  //     name,
  //     email,
  //     password,
  //     old_password,
  //     phone,
  //   });

  //   return res.json({ ok: true });
  // }

  // public async destroy(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   const deleteEmployee = container.resolve(DeleteEmployeeService);

  //   await deleteEmployee.execute({ id });

  //   return res.status(204).send();
  // }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createEmployeePosition = container.resolve(
      CreateEmployeePositionService,
    );

    const employeePosition = await createEmployeePosition.execute({
      name,
    });

    return res.json(employeePosition);
  }
}
