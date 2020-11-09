// src/routes/index.ts
import { Router } from 'express';

import usersRouter from '@module/users/infra/http/routes/users.routes';
import sessionsEmployees from '@module/employees/infra/http/routes/sessionsEmployees.routes';
import employeesPosition from '@module/employeesPosition/infra/http/routes/employeesPosition.routes';
import pharmacies from '@module/pharmacies/infra/http/routes/pharmacies.routes';
import employees from '@module/employees/infra/http/routes/employees.routes';
import medicines from '@module/medicines/infra/http/routes/medicines.routes';
import pharmaciesMedicines from '@module/pharmacies/infra/http/routes/pharmaciesMedicines.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions/employees', sessionsEmployees);
routes.use('/employees/position', employeesPosition);
routes.use('/employees', employees);
routes.use('/pharmacies', pharmacies);
routes.use('/medicines', medicines);
routes.use('/pharmacies-medicines', pharmaciesMedicines);

export default routes;
