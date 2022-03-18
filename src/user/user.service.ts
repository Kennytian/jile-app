import { Injectable } from '@nestjs/common';
import { PrismaService } from '../base/prisma.service';
import { Prisma, user as User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // findOne
  async user(userWhereUniqueInput: Prisma.userWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }

  // findMany
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userWhereUniqueInput;
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithRelationInput;
  }): Promise<[User[], number]> {
    const { where } = params;
    return this.prisma.$transaction([this.prisma.user.findMany(params), this.prisma.user.count({ where })]);
  }

  // create
  async createUser(data: Prisma.userCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  // updateOne
  async updateUser(params: { where: Prisma.userWhereUniqueInput; data: Prisma.userUpdateInput }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({ data, where });
  }

  // deleteOne
  async deleteUser(where: Prisma.userWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
