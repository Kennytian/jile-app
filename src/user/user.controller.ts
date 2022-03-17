import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma, user as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { getSkip, getTake } from '../utils/digital';

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

  @Post('many')
  manyUser(@Body() data): Promise<UserModel[]> {
    const { id, email, updatedAt, index, size } = data;

    const where: Prisma.userWhereInput = {};
    if (id) where.id = { equals: id };
    if (email) where.email = { contains: email };
    if (updatedAt) where.updatedAt = { gte: updatedAt };

    const orderBy: Prisma.userOrderByWithRelationInput = {
      email: 'asc',
    };

    const params = { where, orderBy, skip: getSkip(index, getTake(size)), take: getTake(size) };

    return this.userService.users(params);
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
