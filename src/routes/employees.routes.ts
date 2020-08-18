import { Router } from 'express';

import CreateEmployeeService from '../services/CreateEmployeeService';

import ensureEmployeeAuthenticated from '../middlewares/ensureEmployeeAuthenticated';

const employeesRouter = Router();

employeesRouter.use(ensureEmployeeAuthenticated);

employeesRouter.post('/create', async (req, res) => {
  try {
    const { user_id, employee_position_id, pharmacie_id } = req.body;

    const createEmployee = new CreateEmployeeService();

    await createEmployee.execute({
      user_id,
      employee_position_id,
      pharmacie_id,
    });

    return res.json({ success: 'ok' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default employeesRouter;
