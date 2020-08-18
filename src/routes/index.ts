// src/routes/index.ts
import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsEmployees from './sessionsEmployees.routes';
import employeesPosition from './employeesPosition.routes';
import pharmacies from './pharmacies.routes';
import employees from './employees.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions/employees', sessionsEmployees);
routes.use('/employees/position', employeesPosition);
routes.use('/employees', employees);
routes.use('/pharmacies', pharmacies);

export default routes;
