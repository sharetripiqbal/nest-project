import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordService } from './password/password.service';
import { UserRepository } from './user.repo';

@Module({
  providers: [UsersService, PasswordService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
