import { Router } from 'express';
import SessionsUsersController from '../controllers/SessionsUsersController';

const sessionsUsers = Router();
const sessionsUsersController = new SessionsUsersController();

sessionsUsers.post('/', sessionsUsersController.create);

export default sessionsUsers;
