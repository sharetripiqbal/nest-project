import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './user.repo';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: CreateUserDto) {
    return this.userRepository.createUser(userData);
  }
}
