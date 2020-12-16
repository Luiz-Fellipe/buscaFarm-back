import { container } from 'tsyringe';

import './providers';

import EmployeesRepository from '@module/employees/infra/typeorm/repositories/EmployeesRepository';
import IEmployeesRepository from '@module/employees/repositories/IEmployeesRepository';

import IEmployeesPositionRepository from '@module/employeesPosition/repositories/IEmployeesPositionRepository';
import EmployeesPositionRepository from '@module/employeesPosition/infra/typeorm/repositories/EmployeesPositionRepository';

import IPharmacieRepository from '@module/pharmacies/repositories/IPharmaciesRepository';
import PharmacieRepository from '@module/pharmacies/infra/typeorm/repositories/PharmaciesRepository';

import IUsersRepository from '@module/users/repositories/IUsersRepository';
import UsersRepository from '@module/users/infra/typeorm/repositories/UsersRepository';

import MedicinesRepository from '@module/medicines/infra/typeorm/repositories/MedicinesRepository';
import IMedicinesRepository from '@module/medicines/repositories/IMedicinesRepository';

import BudgetsRepository from '@module/budgets/infra/typeorm/repositories/BudgetsRepository';
import IBudgetsRepository from '@module/budgets/repositories/IBudgetsRepository';

container.registerSingleton<IEmployeesRepository>(
  'EmployeesRepository',
  EmployeesRepository,
);

container.registerSingleton<IEmployeesPositionRepository>(
  'EmployeesPositionRepository',
  EmployeesPositionRepository,
);

container.registerSingleton<IPharmacieRepository>(
  'PharmacieRepository',
  PharmacieRepository,
);

container.registerSingleton<IBudgetsRepository>(
  'BudgetRepository',
  BudgetsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IMedicinesRepository>(
  'MedicinesRepository',
  MedicinesRepository,
);
