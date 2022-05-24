import {
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
  sign,
  verify,
} from 'jsonwebtoken';

import {
  IEncryptProvider,
  IVerifyCriptographyProvider,
} from '@application/protocols/providers/cryptography';

import {
  AccessTokenExpiredError,
  InvalidAccessTokenError,
} from '@presentation/errors';

export class JWTCryptographyProvider
  implements IEncryptProvider, IVerifyCriptographyProvider
{
  constructor(
    private readonly secret: string,
    private readonly expiresInSeconds: number
  ) {}

  async encrypt(
    data: IEncryptProvider.Input
  ): Promise<IEncryptProvider.Output> {
    const { value } = data;

    return sign({}, this.secret, {
      subject: value,
      expiresIn: this.expiresInSeconds,
    });
  }

  async verify(
    data: IVerifyCriptographyProvider.Input
  ): Promise<IVerifyCriptographyProvider.Output> {
    const { value } = data;

    try {
      const { sub } = verify(value, this.secret) as JwtPayload;

      return { payload: sub };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AccessTokenExpiredError();
      }

      if (error instanceof JsonWebTokenError) {
        throw new InvalidAccessTokenError();
      }

      throw error;
    }
  }
}
