import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma, user as UserModel } from '@prisma/client';
import { getSkip, getTake } from '../utils/digital';
import { RespCatch, RespError, RespOK } from '../utils/resp';
import { UserDto, createUserCheck, idCheck, manyUserCheck } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('无需验证接口Auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post()
  async createUser(@Body() input: Prisma.userCreateInput, @Res() res: Response) {
    const [error] = createUserCheck.validate(input);
    if (error) {
      return RespError(res, null, error.message);
    }

    try {
      const result = await this.userService.createUser(input);
      RespOK(res, result);
    } catch (e) {
      RespCatch(res, e);
    }
  }

  @Get()
  async users(@Res() res: Response) {
    try {
      const [result, total] = await this.userService.users({});
      RespOK(res, result, '', total);
    } catch (e) {
      RespCatch(res, e);
    }
  }

  @Get(':id')
  async user(@Param('id') id: string, @Res() res: Response) {
    const [error] = idCheck.validate({ id });
    if (error) {
      return RespError(res, null, error.message);
    }

    try {
      const result = await this.userService.user({ id });
      RespOK(res, result);
    } catch (e) {
      RespCatch(res, e);
    }
  }

  @Post('many')
  async manyUser(@Body() data: UserDto & UserModel, @Res() res: Response) {
    const [error] = manyUserCheck.validate(data);
    if (error) {
      return RespError(res, null, error.message);
    }

    try {
      const { id, name, email, updatedAt, index, size } = data;

      const where: Prisma.userWhereInput = {};
      if (id) where.id = { equals: id };
      if (name) where.name = { contains: name };
      if (email) where.email = { equals: email };
      if (updatedAt) where.updatedAt = { gte: updatedAt };

      const orderBy: Prisma.userOrderByWithRelationInput = { email: 'asc' };
      const params = { where, orderBy, skip: getSkip(index, getTake(size)), take: getTake(size) };
      const [result, total] = await this.userService.users(params);
      RespOK(res, result, '', total);
    } catch (e) {
      RespCatch(res, e);
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UserModel, @Res() res: Response) {
    const [error] = idCheck.validate({ id });
    if (error) {
      return RespError(res, null, error.message);
    }

    try {
      const result = await this.userService.updateUser({ where: { id }, data });
      RespOK(res, result);
    } catch (e) {
      RespCatch(res, e);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const [error] = idCheck.validate({ id });
    if (error) {
      return res.send({ code: HttpStatus.BAD_REQUEST, message: error.message, data: null });
    }

    try {
      const result = await this.userService.deleteUser({ id });
      res.send({ code: HttpStatus.OK, message: 'success', data: result });
    } catch (e) {
      console.error(e?.meta?.cause);
      RespCatch(res, e);
    }
  }
}
