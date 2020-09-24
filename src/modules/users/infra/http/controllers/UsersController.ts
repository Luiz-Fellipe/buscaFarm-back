import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@module/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  // public async index(req: Request, res: Response): Promise<Response> {
  //   // const { pageLenght, pageStart, search } = req.params;

  //   const employeesRepository = container.resolve(EmployeesRepository);

  //   const employees = await employeesRepository.findWithPagination({
  //     pageLenght: 30,
  //     pageStart: 0,
  //     search: '',
  //   });

  //   return res.json({ employees });
  // }

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
    const { name, email, password, phone } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      phone,
    });

    return res.json(classToClass(user));
  }
}
