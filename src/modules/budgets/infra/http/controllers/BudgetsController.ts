import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateBudgetService from '@module/budgets/services/CreateBudgetService';
import DeleteBudgetService from '@module/budgets/services/DeleteBudgetService';
import BudgetsRepository from '../../typeorm/repositories/BudgetsRepository';

export default class BudgetsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const {
      pageLength,
      pageStart,
      date,
      user_id,
      pharmacie_id,
    } = req.query as any;
    const budgetsRepository = container.resolve(BudgetsRepository);

    const budgets = await budgetsRepository.findWithPagination({
      user_id,
      pharmacie_id,
      pageLength,
      pageStart,
      date,
    });

    return res.json(classToClass(budgets));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const budgetsRepository = container.resolve(BudgetsRepository);

    const budget = await budgetsRepository.findById(id);

    return res.json(classToClass(budget));
  }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const {
  //     employee_id,
  //     employee_position_id,
  //     name,
  //     email,
  //     password,
  //     old_password,
  //     phone,
  //   } = req.body;

  //   const updateEmployee = container.resolve(UpdateEmployeeService);

  //   const updateUser = container.resolve(UpdateUserService);

  //   const { user_id } = await updateEmployee.execute({
  //     employee_id,
  //     employee_position_id,
  //   });

  //   await updateUser.execute({
  //     user_id,
  //     name,
  //     email,
  //     password,
  //     old_password,
  //     phone,
  //   });

  //   return res.json({ ok: true });
  // }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteBudget = container.resolve(DeleteBudgetService);

    await deleteBudget.execute({ id });

    return res.status(204).send();
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, pharmacie_id, medicines } = req.body;

    const createBudget = container.resolve(CreateBudgetService);

    const budget = await createBudget.execute({
      user_id,
      pharmacie_id,
      medicines,
    });

    return res.json(classToClass(budget));
  }
}
