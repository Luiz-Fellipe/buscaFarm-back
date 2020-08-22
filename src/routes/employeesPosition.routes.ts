import { Router } from 'express';

import CreateEmployeePositionService from '../services/CreateEmployeePositionService';

import ensureEmployeeAuthenticated from '../middlewares/ensureEmployeeAuthenticated';

const employeesPositionRouter = Router();

employeesPositionRouter.use(ensureEmployeeAuthenticated);

employeesPositionRouter.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    const createEmployeePosition = new CreateEmployeePositionService();

    const employeePosition = await createEmployeePosition.execute({
      name,
    });

    return res.json(employeePosition);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default employeesPositionRouter;
