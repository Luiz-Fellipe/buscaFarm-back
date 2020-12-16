import { ResponsePaginationProps } from '@shared/dtos/IPaginationProps';
import Budget from '../infra/typeorm/entities/Budget';
import ICreateBudgetDTO from '../dtos/ICreateBudgetDTO';
import IFindBudgetDTO from '../dtos/IFindBudgetDTO';

export default interface IBudgetsRepository {
  create(data: ICreateBudgetDTO): Promise<Budget>;
  findById(id: string): Promise<Budget | undefined>;
  findWithPagination({
    user_id,
    pageStart,
    pageLength,
    date,
  }: IFindBudgetDTO): Promise<ResponsePaginationProps | undefined>;
  remove(budget: Budget): Promise<void>;
  save(budget: Budget): Promise<Budget>;
}
