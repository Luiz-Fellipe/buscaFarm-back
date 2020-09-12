import {
  ResponsePaginationProps,
  PaginationProps,
} from '@shared/dtos/IPaginationProps';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findWithPagination({
    pageStart,
    pageLenght,
    search,
  }: PaginationProps): Promise<ResponsePaginationProps | undefined>;

  save(user: User): Promise<User>;
  remove(user: User): Promise<void>;
}
