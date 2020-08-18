import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import Employee from '../models/Employee';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  employee: Employee;
  token: string;
}

class AuthenticateEmployeeService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const employeesRepository = getRepository(Employee);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const { id } = user;
    const employee = await employeesRepository.findOne({
      where: { user_id: id },
      relations: ['user', 'pharmacie', 'employee_position'],
    });

    if (!employee) {
      throw new Error('User not found');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      employee,
      token,
    };
  }
}

export default AuthenticateEmployeeService;
