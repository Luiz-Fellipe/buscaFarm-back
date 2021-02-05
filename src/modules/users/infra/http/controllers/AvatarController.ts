import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

export default class AvatarController {
  public async create(req: Request, res: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);
    const { userId } = req.user as any;

    const user = await updateAvatar.execute({
      user_id: userId,
      avatarFileName: req.file.filename,
    });

    return res.json(classToClass(user));
  }
}
