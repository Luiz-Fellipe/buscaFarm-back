import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsEmployees = Router();
const sessionsController = new SessionsController();

sessionsEmployees.post('/', sessionsController.create);

export default sessionsEmployees;
