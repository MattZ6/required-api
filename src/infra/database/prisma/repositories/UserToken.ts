import {
  ICreateUserTokenRepository,
  IDeleteUserTokenByIdRepository,
  IFindUserTokenByTokenRepository,
} from '@application/protocols/repositories/user'

import { prisma } from '..'

export class PrismaUserTokensRepository
  implements
    ICreateUserTokenRepository,
    IDeleteUserTokenByIdRepository,
    IFindUserTokenByTokenRepository
{
  async findByToken(
    data: IFindUserTokenByTokenRepository.Input,
  ): Promise<IFindUserTokenByTokenRepository.Output> {
    const { token } = data

    const userToken = await prisma.userToken.findUnique({
      where: { token },
    })

    return userToken ?? null
  }

  async deleteById(
    data: IDeleteUserTokenByIdRepository.Input,
  ): Promise<IDeleteUserTokenByIdRepository.Output> {
    const { id } = data

    await prisma.userToken.delete({
      where: {
        id,
      },
    })
  }

  async create(
    data: ICreateUserTokenRepository.Input,
  ): Promise<ICreateUserTokenRepository.Output> {
    const { user_id, expires_in, token } = data

    const userToken = await prisma.userToken.create({
      data: {
        user_id,
        expires_in,
        token,
      },
    })

    return userToken
  }
}
