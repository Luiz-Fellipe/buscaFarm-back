import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMedicineService from '@module/medicines/services/CreateMedicineService';
import { classToClass } from 'class-transformer';
import UpdateMedicineService from '@module/medicines/services/UpdateMedicineService';
import DeleteMedicineService from '@module/medicines/services/DeleteMedicine';
import MedicinesRepository from '../../typeorm/repositories/MedicinesRepository';

export default class MedicinesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { pageLength, pageStart, search } = req.query as any;

    const medicinesRepository = container.resolve(MedicinesRepository);

    const medicines = await medicinesRepository.findWithPagination({
      pageStart,
      pageLength,
      search,
    });

    return res.json(classToClass(medicines));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const medicinesRepository = container.resolve(MedicinesRepository);

    const medicine = await medicinesRepository.findById(id);

    return res.json({ medicine: classToClass(medicine) });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, amount, manufacturer, price } = req.body;

    const updateMedicine = container.resolve(UpdateMedicineService);

    updateMedicine.execute({
      id,
      name: name.toLowerCase(),
      amount,
      manufacturer: manufacturer.toLowerCase(),
      price,
    });

    return res.json({ ok: true });
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteMedicine = container.resolve(DeleteMedicineService);

    await deleteMedicine.execute({ id });

    return res.status(204).send();
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, amount, manufacturer, price } = req.body;

    const createMedicine = container.resolve(CreateMedicineService);

    const medicine = await createMedicine.execute({
      name: name.toLowerCase(),
      amount,
      manufacturer: manufacturer.toLowerCase(),
      price,
    });

    return res.json(medicine);
  }
}
