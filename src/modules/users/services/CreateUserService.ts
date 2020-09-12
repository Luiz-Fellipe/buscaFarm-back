import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import User from '@module/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    phone,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    const hashedPassword = await hash(password, 8);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return user;
  }
}

export default CreateUserService;
