import ImportPharmacieMedicineCsvService from '@module/pharmacies/services/ImportPharmacieMedicineCsvService';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';
import neatCsv from 'neat-csv';
import fs from 'fs';

export default class PharmaciesUploadCsvMedicineController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { pharmacieId } = req.user as any;

    const importPharmacieMedicineCsvService = container.resolve(
      ImportPharmacieMedicineCsvService,
    );

    fs.readFile(req.file.path, async (err, data) => {
      if (err) {
        throw new AppError('An error occurred while importing the file');
      }

      const medicines = await neatCsv(data);

      await importPharmacieMedicineCsvService.execute({
        pharmacieId,
        medicines,
      });
    });

    return res.json({ success: true });
  }
}
