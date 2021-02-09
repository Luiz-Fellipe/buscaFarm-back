import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
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
}
