import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import PharmaciesMedicinesRepository from '../../typeorm/repositories/PharmaciesMedicinesRepository';

export default class PharmaciesMedicinesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { pageLength, pageStart, search } = req.query as any;

    const pharmaciesMedicinesRepository = container.resolve(
      PharmaciesMedicinesRepository,
    );

    const pharmaciesMedicines = await pharmaciesMedicinesRepository.findWithPagination(
      {
        pageLength,
        pageStart,
        search,
      },
    );

    return res.json(classToClass(pharmaciesMedicines));
  }

  // public async show(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const employeesRepository = container.resolve(EmployeesRepository);

  //   const employee = await employeesRepository.findById(id);

  //   return res.json({ employee });
  // }

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

  // public async destroy(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   const deleteEmployee = container.resolve(DeleteEmployeeService);

  //   await deleteEmployee.execute({ id });

  //   return res.status(204).send();
  // }

  // public async create(req: Request, res: Response): Promise<Response> {
  //   const {
  //     company_name,
  //     cnpj,
  //     city,
  //     uf,
  //     neighborhood,
  //     street,
  //     adress_number,
  //     zip_code,
  //     complement,
  //     latitude,
  //     longitude,
  //     phone,
  //   } = req.body;

  //   const createPharmacie = container.resolve(CreatePharmacieService);

  //   const pharmacie = await createPharmacie.execute({
  //     company_name,
  //     cnpj,
  //     city,
  //     uf,
  //     neighborhood,
  //     street,
  //     adress_number,
  //     zip_code,
  //     complement,
  //     latitude,
  //     longitude,
  //     phone,
  //   });

  //   return res.json(pharmacie);
  // }
}
