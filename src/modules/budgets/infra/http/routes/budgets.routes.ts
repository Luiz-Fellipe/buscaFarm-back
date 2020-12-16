import { Router } from 'express';

import ensureEmployeeAuthenticated from '@module/employees/infra/http/middlewares/ensureEmployeeAuthenticated';

import BudgetsController from '../controllers/BudgetsController';

const budgetsRouter = Router();
const budgetsController = new BudgetsController();

budgetsRouter.use(ensureEmployeeAuthenticated);

budgetsRouter.post('/create', budgetsController.create);
budgetsRouter.get('/', budgetsController.index);

budgetsRouter.get('/:id', budgetsController.show);
budgetsRouter.delete('/:id', budgetsController.destroy);

export default budgetsRouter;
