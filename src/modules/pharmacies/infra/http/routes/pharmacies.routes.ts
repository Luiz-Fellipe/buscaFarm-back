import { Router } from 'express';

import ensureEmployeeAuthenticated from '@module/employees/infra/http/middlewares/ensureEmployeeAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';
import PharmaciesController from '../controllers/PharmaciesController';
import PharmaciesAvatarController from '../controllers/PharmaciesAvatarController';
import PharmaciesUploadCsvMedicineController from '../controllers/PharmaciesUploadCsvMedicineController';
import CurrentPharmacieMedicinesController from '../controllers/CurrentPharmacieMedicinesController';

const pharmaciesRouter = Router();
const pharmaciesController = new PharmaciesController();
const pharmaciesAvatarController = new PharmaciesAvatarController();
const pharmaciesUploadCsvMedicineController = new PharmaciesUploadCsvMedicineController();
const pharmacieMedicinesController = new CurrentPharmacieMedicinesController();

const upload = multer(uploadConfig.multer);

pharmaciesRouter.get('/:id', pharmaciesController.show);
pharmaciesRouter.use(ensureEmployeeAuthenticated);

pharmaciesRouter.post('/create', pharmaciesController.create);
pharmaciesRouter.get('/', pharmaciesController.index);

pharmaciesRouter.put('/edit', pharmaciesController.update);

// pharmacie Medicines
pharmaciesRouter.get('/medicines', pharmacieMedicinesController.index);
pharmaciesRouter.get('/medicines/:id', pharmacieMedicinesController.show);
pharmaciesRouter.put('/medicines/edit', pharmacieMedicinesController.update);
pharmaciesRouter.delete('/medicines/:id', pharmacieMedicinesController.destroy);

pharmaciesRouter.delete('/:id', pharmaciesController.destroy);

pharmaciesRouter.patch(
  '/avatar',
  upload.single('avatar'),
  pharmaciesAvatarController.create,
);

pharmaciesRouter.patch(
  '/upload-csv',
  upload.single('csv'),
  pharmaciesUploadCsvMedicineController.create,
);

export default pharmaciesRouter;
