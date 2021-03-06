/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/user';
import uploadConfig from '../config/upload';

interface Request {
    user_id: string;
    avatarFileName: string;
}

class UploadUserAvatarService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(user_id);

        if (!user) {
            throw new Error('only authenticate users can change avatar.');
        }
        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath
            );
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
            user.avatar = avatarFileName;

            await userRepository.save(user);
        }
        return user;
    }
}

export default UploadUserAvatarService;
