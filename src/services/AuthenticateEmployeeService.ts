import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateEmployeeService {
  public async execute({ email, password }: Request): Promise<Response> {
    const employeesRepository = getRepository(User);

    const employee = await employeesRepository.findOne({
      where: { email },
    });

    if (!employee) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, employee.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: employee.id,
      expiresIn,
    });

    return {
      user: employee,
      token,
    };
  }
}

export default AuthenticateEmployeeService;
