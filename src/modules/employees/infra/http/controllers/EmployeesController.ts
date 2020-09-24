import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@module/users/services/CreateUserService';
import CreateEmployeeService from '@module/employees/services/CreateEmployeeService';
import UpdateUserService from '@module/users/services/UpdateUserService';
import UpdateEmployeeService from '@module/employees/services/UpdateEmployeeService';
import DeleteEmployeeService from '@module/employees/services/DeleteEmployeeService';

import { classToClass } from 'class-transformer';
import EmployeesRepository from '../../typeorm/repositories/EmployeesRepository';

export default class EmployeesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { pageLength, pageStart, search } = req.query as any;
    const { pharmacieId } = req.user as any;

    const employeesRepository = container.resolve(EmployeesRepository);

    const employees = await employeesRepository.findWithPagination({
      pharmacieId,
      pageLength,
      pageStart,
      search,
    });

    return res.json({ employee: classToClass(employees) });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const employeesRepository = container.resolve(EmployeesRepository);

    const employee = await employeesRepository.findById(id);

    return res.json({ employee: classToClass(employee) });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      employee_id,
      employee_position_id,
      name,
      email,
      password,
      old_password,
      phone,
    } = req.body;

    const updateEmployee = container.resolve(UpdateEmployeeService);

    const updateUser = container.resolve(UpdateUserService);

    const { user_id } = await updateEmployee.execute({
      employee_id,
      employee_position_id,
    });

    await updateUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
      phone,
    });

    return res.json({ ok: true });
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteEmployee = container.resolve(DeleteEmployeeService);

    await deleteEmployee.execute({ id });

    return res.status(204).send();
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      employee_position_id,
      pharmacie_id,
      name,
      email,
      password,
      phone,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const { id } = await createUser.execute({
      name,
      email,
      password,
      phone,
    });

    const createEmployee = container.resolve(CreateEmployeeService);

    await createEmployee.execute({
      user_id: id,
      employee_position_id,
      pharmacie_id,
    });

    return res.json({ success: 'ok' });
  }
}
