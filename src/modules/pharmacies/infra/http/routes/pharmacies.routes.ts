import { Router } from 'express';

import ensureEmployeeAuthenticated from '@module/employees/infra/http/middlewares/ensureEmployeeAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';
import PharmaciesController from '../controllers/PharmaciesController';
import PharmaciesAvatarController from '../controllers/PharmaciesAvatarController';

const pharmaciesRouter = Router();
const pharmaciesController = new PharmaciesController();
const pharmaciesAvatarController = new PharmaciesAvatarController();
const upload = multer(uploadConfig.multer);
pharmaciesRouter.use(ensureEmployeeAuthenticated);

pharmaciesRouter.post('/create', pharmaciesController.create);
pharmaciesRouter.get('/', pharmaciesController.index);

pharmaciesRouter.get('/:id', pharmaciesController.show);
pharmaciesRouter.delete('/:id', pharmaciesController.destroy);

pharmaciesRouter.patch(
  '/avatar',
  upload.single('avatar'),
  pharmaciesAvatarController.create,
);

export default pharmaciesRouter;
