import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from './password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private passwordService: PasswordService,
  ) {}

  async createUser(req: CreateUserDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      req.password,
    );

    this.usersRepository.create(req);

    const user = await this.usersRepository.save({
      ...req,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
