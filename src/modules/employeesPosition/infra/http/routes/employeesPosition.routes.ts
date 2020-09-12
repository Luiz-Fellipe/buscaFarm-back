import { Router } from 'express';

import ensureEmployeeAuthenticated from '@module/employees/infra/http/middlewares/ensureEmployeeAuthenticated';
import EmployeesPositionController from '../controllers/EmployeesPositionController';

const employeesPositionRouter = Router();
const employeesPositionController = new EmployeesPositionController();
employeesPositionRouter.use(ensureEmployeeAuthenticated);

employeesPositionRouter.get('/', employeesPositionController.index);

employeesPositionRouter.post('/create', employeesPositionController.create);

export default employeesPositionRouter;
