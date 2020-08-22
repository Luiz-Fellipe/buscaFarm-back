import { Router } from 'express';

import CreatePharmacieService from '../services/CreatePharmacieService';
import ensureEmployeeAuthenticated from '../middlewares/ensureEmployeeAuthenticated';

const pharmaciesRouter = Router();

pharmaciesRouter.use(ensureEmployeeAuthenticated);

pharmaciesRouter.post('/create', async (req, res) => {
  try {
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

    const createPharmacie = new CreatePharmacieService();

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
    });

    return res.json(pharmacie);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default pharmaciesRouter;