import { Router } from 'express';

import AuthenticateEmployeeService from '../services/AuthenticateEmployeeService';

const sessionsEmployees = Router();

sessionsEmployees.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticatiteEmployee = new AuthenticateEmployeeService();

    const { user, token } = await authenticatiteEmployee.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default sessionsEmployees;
