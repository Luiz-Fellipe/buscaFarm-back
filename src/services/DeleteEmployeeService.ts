import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
  id: string;
}

class DeleteEmployeeService {
  public async execute({ id }: Request): Promise<void> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);

    if (!id) {
      throw new Error('This Employee does not exist');
    }

    await userRepository.remove(user);
  }
}

export default DeleteEmployeeService;
