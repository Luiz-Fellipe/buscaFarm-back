// src/routes/index.ts
import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsEmployees from './sessionsEmployees.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions/employees', sessionsEmployees);

export default routes;
