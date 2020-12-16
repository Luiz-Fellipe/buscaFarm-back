import Budget from '@module/budgets/infra/typeorm/entities/Budget';
import IMedicinesRepository from '@module/medicines/repositories/IMedicinesRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICreateBudgetReqDTO from '../dtos/ICreateBudgetReqDTO';
import IBudgetsRepository from '../repositories/IBudgetsRepository';

@injectable()
class CreateBudgetService {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetsRepository,
    @inject('MedicinesRepository')
    private medicineRepository: IMedicinesRepository,
  ) {}

  public async execute({
    user_id,
    pharmacie_id,
    medicines,
  }: ICreateBudgetReqDTO): Promise<Budget> {
    let value = 0.0;

    const medicinesIds = medicines.map(medicine => {
      return { id: medicine.medicine_id };
    });

    const medicinesData = await this.medicineRepository.findAllById(
      medicinesIds,
    );

    const medicinesFinal = medicinesData.map(medicine => {
      const medicineFinal = medicines.find(
        medicineFind => medicineFind.medicine_id === medicine.id,
      );

      if (!medicineFinal) {
        throw new AppError('Medicine not found');
      }

      value += medicineFinal.price;

      return {
        medicine_id: medicineFinal.medicine_id,
        price: medicineFinal.price || 0,
        amount: medicineFinal.amount || 0,
      };
    });

    const newBudget = this.budgetRepository.create({
      user_id,
      pharmacie_id,
      value,
      medicines: medicinesFinal,
    });

    return newBudget;
  }
}

export default CreateBudgetService;
