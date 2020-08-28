import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  phone?: string;
}

class UpdateUserService {
  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
    phone,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error('This user is not registered in our database');
    }

    const userWithUpdatedEmail = await usersRepository.findOne({
      where: { email },
    });

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new Error('The email is already being used by another user');
    }

    if (password && !old_password) {
      throw new Error(
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

    return usersRepository.save(user);
  }
}

export default UpdateUserService;
