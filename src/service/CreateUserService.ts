import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/user';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execult({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });
        if (checkUserExists) {
            throw new Error('Email address already used');
        }

        const hashPassword = await hash(password, 10);

        const user = usersRepository.create({
            name,
            email,
            password: hashPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
