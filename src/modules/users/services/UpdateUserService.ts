import { hash, compare } from 'bcryptjs';
import User from '@module/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  phone?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
    phone,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('This user is not registered in our database');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('The email is already being used by another user');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const passwordMatched = await compare(old_password, user.password);
      if (!passwordMatched) {
        throw new Error('The old password does not match');
      }
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    if (phone) {
      user.phone = phone;
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
