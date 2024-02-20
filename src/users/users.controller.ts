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

            if (newUser) { res.status(HttpStatus.CREATED).send(newUser) } 
            else { res.status(HttpStatus.CONFLICT).send({ message: 'User already exists' }) }
        } catch (error) { res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: `Internal server error: \n THE ERROR: ${error}` }) }
    }
}
