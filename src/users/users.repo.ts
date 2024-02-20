import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from './password/password.service';

@Injectable()
export class UsersRepo {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
        private passwordService: PasswordService,
    ) {}

    async create(req: CreateUserDto) {
        const { username } = req;

        const user = await this.usersRepository.findOne({ where: { username } });
        if (user) {
            Logger.log(`User ${username} already exists`);
            return null;
        }

        const hashedPassword = await this.passwordService.hashPassword(req.password);

        const newUser = await this.usersRepository.save({...req,password: hashedPassword});

        const { password, ...userWithoutPassword } = newUser;
        Logger.log(`User created: ${JSON.stringify(userWithoutPassword)}`);

        return userWithoutPassword;
    }
}
