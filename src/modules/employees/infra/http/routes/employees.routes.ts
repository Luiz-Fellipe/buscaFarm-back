import { Router } from 'express';

import ensureEmployeeAuthenticated from '@module/employees/infra/http/middlewares/ensureEmployeeAuthenticated';
import EmployeesController from '../controllers/EmployeesController';

const employeesRouter = Router();
const employeesController = new EmployeesController();

employeesRouter.use(ensureEmployeeAuthenticated);

employeesRouter.get('/', employeesController.index);

employeesRouter.get('/:id', employeesController.show);

employeesRouter.post('/create', employeesController.create);

employeesRouter.put('/edit', employeesController.update);

employeesRouter.delete('/delete/:id', employeesController.destroy);

export default employeesRouter;
