import { Router } from 'express';

import ensureEmployeeAuthenticated from '@module/employees/infra/http/middlewares/ensureEmployeeAuthenticated';
import PharmaciesController from '../controllers/PharmaciesController';

const pharmaciesRouter = Router();
const pharmaciesController = new PharmaciesController();
pharmaciesRouter.use(ensureEmployeeAuthenticated);

pharmaciesRouter.post('/create', pharmaciesController.create);
pharmaciesRouter.get('/', pharmaciesController.index);

pharmaciesRouter.get('/:id', pharmaciesController.show);
pharmaciesRouter.delete('/:id', pharmaciesController.destroy);

export default pharmaciesRouter;
