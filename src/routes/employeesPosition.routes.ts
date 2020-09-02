import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateEmployeePositionService from '../services/CreateEmployeePositionService';
import EmployeePosition from '../models/EmployeePosition';

import ensureEmployeeAuthenticated from '../middlewares/ensureEmployeeAuthenticated';

const employeesPositionRouter = Router();

employeesPositionRouter.use(ensureEmployeeAuthenticated);

employeesPositionRouter.get('/', async (req, res) => {
  const employeesRepository = getRepository(EmployeePosition);

  const employeesPosition = await employeesRepository.find();

  return res.json({ employeesPosition });
});

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
