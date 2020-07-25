import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../service/CreateUserService';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

import UpdateAvatarUserService from '../service/UploadUserAvatarService';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();

        const user = await createUser.execult({ name, email, password });
        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

userRouter.patch(
    '/avatar',
    ensureAuthenticate,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateUserAvatar = new UpdateAvatarUserService();
            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFileName: request.file.filename,
            });
            delete user.password;
            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
);

export default userRouter;
