import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateEmployeeService from '@module/employees/services/AuthenticateEmployeeService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticatiteEmployee = container.resolve(
      AuthenticateEmployeeService,
    );

    const { employee, token } = await authenticatiteEmployee.execute({
      email,
      password,
    });

    return res.json({ employee: classToClass(employee), token });
  }
}
