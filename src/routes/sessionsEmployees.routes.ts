import { Router } from 'express';

import AuthenticateEmployeeService from '../services/AuthenticateEmployeeService';

const sessionsEmployees = Router();

sessionsEmployees.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticatiteEmployee = new AuthenticateEmployeeService();

    const { employee, token } = await authenticatiteEmployee.execute({
      email,
      password,
    });

    delete employee.user.password;

    return res.json({ employee, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default sessionsEmployees;
