import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/create', async (req, res) => {
  const { name, email, password, phone } = req.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    phone,
  });

  return res.json(user);
});

export default usersRouter;
