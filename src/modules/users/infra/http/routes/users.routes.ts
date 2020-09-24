import ensureEmployeeAuthenticated from '@module/employees/infra/http/middlewares/ensureEmployeeAuthenticated';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import multer from 'multer';
import AvatarController from '../controllers/AvatarController';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();
const avatarController = new AvatarController();
const upload = multer(uploadConfig.multer);

usersRouter.post('/create', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureEmployeeAuthenticated,
  upload.single('avatar'),
  avatarController.create,
);

export default usersRouter;
