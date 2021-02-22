import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import UpdatePharmacieMedicinesService from '@module/pharmacies/services/UpdatePharmacieMedicinesService';
import DeletePharmacieMedicinesService from '@module/pharmacies/services/DeletePharmacieMedicinesService';
import PharmaciesMedicinesRepository from '../../typeorm/repositories/PharmaciesMedicinesRepository';

export default class CurrentPharmacieMedicinesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { pageLength, pageStart, search } = req.query as any;

    const { pharmacieId } = req.user as any;

    const pharmaciesMedicinesRepository = container.resolve(
      PharmaciesMedicinesRepository,
    );

    const pharmacieMedicines = await pharmaciesMedicinesRepository.findMedicinesFromThePharmacyWithPagination(
      {
        pharmacieId,
        pageLength,
        pageStart,
        search,
      },
    );

    return res.json(classToClass(pharmacieMedicines));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { pharmacieId } = req.user as any;
    const pharmaciesMedicinesRepository = container.resolve(
      PharmaciesMedicinesRepository,
    );

    const pharmacieMedicine = await pharmaciesMedicinesRepository.findByMedicine(
      id,
      pharmacieId,
    );

    return res.json(classToClass(pharmacieMedicine));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { price, amount, medicine_id } = req.body;

    const { pharmacieId } = req.user as any;

    const updatePharmacie = container.resolve(UpdatePharmacieMedicinesService);

    updatePharmacie.execute({
      pharmacie_id: pharmacieId,
      medicine_id,
      price,
      amount,
    });

    return res.status(204).send();
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePharmacieMedicine = container.resolve(
      DeletePharmacieMedicinesService,
    );

    await deletePharmacieMedicine.execute({ id });

    return res.status(204).send();
  }
}
