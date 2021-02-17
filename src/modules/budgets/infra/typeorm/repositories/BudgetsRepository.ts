import { getRepository, Repository } from 'typeorm';

import { ResponsePaginationProps } from '@shared/dtos/IPaginationProps';
import IBudgetsRepository from '@module/budgets/repositories/IBudgetsRepository';
import ICreateBudgetDTO from '@module/budgets/dtos/ICreateBudgetDTO';
import IFindBudgetDTO from '@module/budgets/dtos/IFindBudgetDTO';
import Budget from '../entities/Budget';

interface IMedicine {
  id: string;
  quantity: number;
  amount: number;
}

interface IRequest {
  customer_id: string;
  products: IMedicine[];
}

class BudgetsRepository implements IBudgetsRepository {
  private ormRepository: Repository<Budget>;

  constructor() {
    this.ormRepository = getRepository(Budget);
  }

  public async findById(id: string): Promise<Budget | undefined> {
    const budget = await this.ormRepository.findOne(id);

    return budget;
  }

  public async findWithPagination({
    user_id,
    pharmacie_id,
    pageStart,
    pageLength,
    date,
  }: IFindBudgetDTO): Promise<ResponsePaginationProps | undefined> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    if (pharmacie_id) {
      const [result, total] = await this.ormRepository
        .createQueryBuilder('budgets')
        .innerJoinAndSelect('budgets.user', 'users')
        .innerJoin('budgets.pharmacie', 'pharmacies')
        .leftJoinAndSelect('budgets.budgets_medicines', 'budgets_medicines')
        .leftJoinAndSelect('budgets_medicines.medicine', 'medicines')
        .where(`pharmacies.id ='${pharmacie_id}'`)
        .andWhere(
          `budgets.created_at BETWEEN '${start.toISOString()}' AND '${end.toISOString()}' `,
        )
        .offset(pageStart)
        .limit(pageLength)
        .getManyAndCount();

      return { data: result, count: total } || undefined;
    }

    const [result, total] = await this.ormRepository
      .createQueryBuilder('budgets')
      .innerJoin('budgets.user', 'users')
      .innerJoinAndSelect('budgets.pharmacie', 'pharmacies')
      .leftJoinAndSelect('budgets.budgets_medicines', 'budgets_medicines')
      .leftJoinAndSelect('budgets_medicines.medicine', 'medicines')
      .where(`budgets.user.id ='${user_id}'`)
      .andWhere(
        `budgets.created_at BETWEEN '${start.toISOString()}' AND '${end.toISOString()}' `,
      )
      .offset(pageStart)
      .limit(pageLength)
      .getManyAndCount();

    return { data: result, count: total } || undefined;
  }

  public async create({
    user_id,
    pharmacie_id,
    medicines,
    value,
  }: ICreateBudgetDTO): Promise<Budget> {
    const budget = this.ormRepository.create({
      user_id,
      value,
      pharmacie_id,
      budgets_medicines: medicines,
    });

    await this.ormRepository.save(budget);

    return budget;
  }

  public async remove(budget: Budget): Promise<void> {
    await this.ormRepository.remove(budget);
  }

  public async save(budget: Budget): Promise<Budget> {
    return this.ormRepository.save(budget);
  }
}

export default BudgetsRepository;
