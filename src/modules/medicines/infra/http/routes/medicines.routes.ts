import { Router } from 'express';
import uploadConfig from '@config/upload';
import multer from 'multer';
import ensureEmployeeAuthenticated from '@module/employees/infra/http/middlewares/ensureEmployeeAuthenticated';
import MedicinesController from '../controllers/MedicinesController';
import ImageMedicineController from '../controllers/ImageMedicineController';

const upload = multer(uploadConfig.multer);

const medicinesRouter = Router();

const medicinesController = new MedicinesController();
const imageMedicineController = new ImageMedicineController();

medicinesRouter.use(ensureEmployeeAuthenticated);

medicinesRouter.get('/', medicinesController.index);
medicinesRouter.get('/:id', medicinesController.show);
medicinesRouter.post('/create', medicinesController.create);
medicinesRouter.put('/edit', medicinesController.update);
medicinesRouter.delete('/delete/:id', medicinesController.destroy);

medicinesRouter.patch(
  '/image',
  upload.single('image'),
  imageMedicineController.create,
);

export default medicinesRouter;
