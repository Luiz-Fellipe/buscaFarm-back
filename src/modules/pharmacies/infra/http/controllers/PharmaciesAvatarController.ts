import UpdatePharmacieAvatarService from '@module/pharmacies/services/UpdatePharmacieAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PharmaciesAvatarController {
  public async create(req: Request, res: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdatePharmacieAvatarService);
    const { pharmacieId } = req.user as any;

    const filename = await updateAvatar.execute({
      pharmacie_id: pharmacieId,
      avatarFileName: req.file.filename,
    });

    return res.json(filename);
  }
}
