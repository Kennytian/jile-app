import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { user as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() data: { email: string }): Promise<UserModel> {
    return this.userService.createUser(data);
  }

  @Get()
  users(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Get(':id')
  user(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id });
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: UserModel): Promise<UserModel> {
    return this.userService.updateUser({ where: { id }, data });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }
}
