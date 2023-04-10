import {
  ICheckIfUserExistsByEmailRepository,
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@application/protocols/repositories/user'

import { prisma } from '..'

export class PrismaUsersRepository
  implements
    ICheckIfUserExistsByEmailRepository,
    ICreateUserRepository,
    IFindUserByEmailRepository,
    IFindUserByIdRepository,
    IUpdateUserRepository
{
  async update(
    data: IUpdateUserRepository.Input,
  ): Promise<IUpdateUserRepository.Output> {
    const { id, name, email, password_hash } = data

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password_hash,
      },
    })

    return user
  }

  async findById(
    data: IFindUserByIdRepository.Input,
  ): Promise<IFindUserByIdRepository.Output> {
    const { id } = data

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user ?? null
  }

  async findByEmail(
    data: IFindUserByEmailRepository.Input,
  ): Promise<IFindUserByEmailRepository.Output> {
    const { email } = data

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    })

    return user ?? null
  }

  async create(
    data: ICreateUserRepository.Input,
  ): Promise<ICreateUserRepository.Output> {
    const { name, email, password_hash } = data

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })

    return user
  }

  async checkIfExistsByEmail(
    data: ICheckIfUserExistsByEmailRepository.Input,
  ): Promise<ICheckIfUserExistsByEmailRepository.Output> {
    const { email } = data

    const count = await prisma.user.count({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    })

    return count > 0
  }
}
