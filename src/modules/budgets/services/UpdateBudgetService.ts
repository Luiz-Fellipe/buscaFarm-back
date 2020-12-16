import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IPharmaciesRepository from '../repositories/IPharmaciesRepository';

interface IRequest {
  pharmacie_id: string;
  avatarFileName: string;
}

@injectable()
class UpdatePharmacieAvatarService {
  constructor(
    @inject('PharmacieRepository')
    private pharmaciesRepository: IPharmaciesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    pharmacie_id,
    avatarFileName,
  }: IRequest): Promise<String> {
    const pharmacie = await this.pharmaciesRepository.findById(pharmacie_id);

    if (!pharmacie) {
      throw new AppError('This pharmacie is not registered in our database');
    }
    if (pharmacie.avatar) {
      await this.storageProvider.deleteFile(pharmacie.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFileName);

    pharmacie.avatar = filename;

    await this.pharmaciesRepository.save(pharmacie);

    return filename;
  }
}

export default UpdatePharmacieAvatarService;
