import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';

import IBudgetsRepository from '../repositories/IBudgetsRepository';

interface Request {
  id: string;
}

@injectable()
class DeleteBudgetService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetsRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const budget = await this.budgetRepository.findById(id);

    if (!budget) {
      throw new AppError('This budget does not exist');
    }

    await this.budgetRepository.remove(budget);
  }
}

export default DeleteBudgetService;
