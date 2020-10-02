import { getRepository, Repository, Like } from 'typeorm';
import IUsersRepository from '@module/users/repositories/IUsersRepository';
import ICreateUserDTO from '@module/users/dtos/ICreateUserDTO';
import {
  PaginationProps,
  ResponsePaginationProps,
} from '@shared/dtos/IPaginationProps';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findWithPagination({
    pageStart,
    pageLength,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: { name: Like(`%${search}%`) },
      take: pageStart,
      skip: pageLength,
    });

    return { data: result, count: total } || undefined;
  }

  public async create({
    email,
    name,
    password,
    phone,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ email, name, password, phone });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export default UsersRepository;
