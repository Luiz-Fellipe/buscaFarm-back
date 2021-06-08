import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

export default class AvatarController {
  public async create(req: Request, res: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);
    const { id, userId } = req.user as any;
    console.log(req.user);
    const user = await updateAvatar.execute({
      user_id: userId || id,
      avatarFileName: req.file.filename,
    });

    return res.json(classToClass(user));
  }
}
