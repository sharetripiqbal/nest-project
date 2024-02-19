import {
  Controller,
  Post,
  Body,
  UsePipes,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterPropertiesPipe } from 'src/common/pipes/filter-properties.pipe';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new FilterPropertiesPipe(['username', 'email', 'password']))
  async createUser(@Body() req: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.usersService.createUser(req);
      return res.status(HttpStatus.CREATED).send(newUser);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
