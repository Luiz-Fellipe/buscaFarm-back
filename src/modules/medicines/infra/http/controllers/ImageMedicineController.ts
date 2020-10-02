import UpdateImageMedicineService from '@module/medicines/services/UpdateImageMedicineService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ImageMedicineController {
  public async create(req: Request, res: Response): Promise<Response> {
    const updateImageMedicine = container.resolve(UpdateImageMedicineService);
    const { medicine_id } = req.body;

    const filename = await updateImageMedicine.execute({
      medicine_id,
      medicineFileName: req.file.filename,
    });

    return res.json(filename);
  }
}
