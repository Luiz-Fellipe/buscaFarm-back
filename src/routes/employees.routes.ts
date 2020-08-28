import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateEmployeeService from '../services/CreateEmployeeService';
import UpdateEmployeeService from '../services/UpdateEmployeeService';
import DeleteEmployeeService from '../services/DeleteEmployeeService';
import UpdateUserService from '../services/UpdateUserService';

import CreateUserService from '../services/CreateUserService';

import Employee from '../models/Employee';

import ensureEmployeeAuthenticated from '../middlewares/ensureEmployeeAuthenticated';

const employeesRouter = Router();

employeesRouter.use(ensureEmployeeAuthenticated);

employeesRouter.get('/', async (req, res) => {
  const employeesRepository = getRepository(Employee);

  const employees = await employeesRepository.find({
    relations: ['user', 'pharmacie', 'employee_position'],
  });

  return res.json({ employees });
});

employeesRouter.post('/create', async (req, res) => {
  try {
    const {
      employee_position_id,
      pharmacie_id,
      name,
      email,
      password,
      phone,
    } = req.body;

    const createUser = new CreateUserService();

    const { id } = await createUser.execute({
      name,
      email,
      password,
      phone,
    });

    const createEmployee = new CreateEmployeeService();

    await createEmployee.execute({
      user_id: id,
      employee_position_id,
      pharmacie_id,
    });

    return res.json({ success: 'ok' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

employeesRouter.put('/edit', async (req, res) => {
  try {
    const {
      employee_id,
      employee_position_id,
      name,
      email,
      password,
      old_password,
      phone,
    } = req.body;

    const updateEmployee = new UpdateEmployeeService();
    const updateUser = new UpdateUserService();

    const { user_id } = await updateEmployee.execute({
      employee_id,
      employee_position_id,
    });

    await updateUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
      phone,
    });

    return res.json({ ok: true });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

employeesRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  const deleteEmployee = new DeleteEmployeeService();

  await deleteEmployee.execute({ id });

  return res.status(204).send();
});

export default employeesRouter;
