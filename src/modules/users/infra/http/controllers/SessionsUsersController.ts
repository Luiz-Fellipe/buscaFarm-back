import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class SessionsUsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticatiteUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticatiteUser.execute({
      email,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }
}
