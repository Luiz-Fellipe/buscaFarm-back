import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import Employee from '@module/employees/infra/typeorm/entities/Employee';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@module/users/repositories/IUsersRepository';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  employee: Employee;
  token?: string;
}
@injectable()
class AuthenticateEmployeeService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { id } = user;
    const employee = await this.employeesRepository.findByUserId(id);

    if (!employee) {
      throw new AppError('User not found');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    delete employee.user.password;

    const { secret, expiresIn } = authConfig.jwt;
    let token;

    if (secret) {
      token = sign({}, secret, {
        subject: `${employee.id},${employee.pharmacie_id}`,
        expiresIn,
      });
    }

    return {
      employee,
      token,
    };
  }
}

export default AuthenticateEmployeeService;
