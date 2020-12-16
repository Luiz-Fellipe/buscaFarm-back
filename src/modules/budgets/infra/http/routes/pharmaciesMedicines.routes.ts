import { Router } from 'express';

import ensureEmployeeAuthenticated from '@module/employees/infra/http/middlewares/ensureEmployeeAuthenticated';
import PharmaciesMedicinesController from '../controllers/PharmaciesMedicinesController';

const pharmaciesMedicinesRouter = Router();

const pharmaciesMedicinesController = new PharmaciesMedicinesController();

pharmaciesMedicinesRouter.use(ensureEmployeeAuthenticated);

pharmaciesMedicinesRouter.get('/', pharmaciesMedicinesController.index);

export default pharmaciesMedicinesRouter;
