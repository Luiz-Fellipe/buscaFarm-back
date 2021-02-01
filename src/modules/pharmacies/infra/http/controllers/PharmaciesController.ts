import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePharmacieService from '@module/pharmacies/services/CreatePharmacieService';
import DeletePharmacieService from '@module/pharmacies/services/DeletePharmacieService';
import { classToClass } from 'class-transformer';
import UpdatePharmacieService from '@module/pharmacies/services/UpdatePharmacieService';
import PharmaciesRepository from '../../typeorm/repositories/PharmaciesRepository';

export default class PharmaciesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { pageLength, pageStart, search } = req.query as any;

    const pharmaciesRepository = container.resolve(PharmaciesRepository);

    const pharmacies = await pharmaciesRepository.findWithPagination({
      pageLength,
      pageStart,
      search,
    });

    return res.json(classToClass(pharmacies));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const pharmaciesRepository = container.resolve(PharmaciesRepository);

    const pharmacie = await pharmaciesRepository.findById(id);

    return res.json({ pharmacie });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      company_name,
      cnpj,
      city,
      uf,
      neighborhood,
      street,
      adress_number,
      zip_code,
      complement,
      latitude,
      longitude,
      phone,
    } = req.body;

    const { pharmacieId } = req.user as any;

    const updatePharmacie = container.resolve(UpdatePharmacieService);

    updatePharmacie.execute({
      pharmacieId,
      company_name,
      cnpj,
      city,
      uf,
      neighborhood,
      street,
      adress_number,
      zip_code,
      complement,
      latitude,
      longitude,
      phone,
    });

    return res.status(204).send();
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePharmacie = container.resolve(DeletePharmacieService);

    await deletePharmacie.execute({ id });

    return res.status(204).send();
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      company_name,
      cnpj,
      city,
      uf,
      neighborhood,
      street,
      adress_number,
      zip_code,
      complement,
      latitude,
      longitude,
      phone,
      medicines,
    } = req.body;

    const createPharmacie = container.resolve(CreatePharmacieService);

    const pharmacie = await createPharmacie.execute({
      company_name,
      cnpj,
      city,
      uf,
      neighborhood,
      street,
      adress_number,
      zip_code,
      complement,
      latitude,
      longitude,
      phone,
      medicines,
    });

    return res.json(pharmacie);
  }
}
