import AppError from '@shared/errors/AppError';
import IUsersRepository from '@module/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface Request {
  id: string;
}

@injectable()
class DeleteEmployeeService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!id) {
      throw new AppError('This Employee does not exist');
    }

    if (user) {
      await this.userRepository.remove(user);
    }
  }
}

export default DeleteEmployeeService;
