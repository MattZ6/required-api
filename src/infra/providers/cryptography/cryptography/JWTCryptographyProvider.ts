import {
  JsonWebTokenError,
  JwtPayload,
  sign,
  TokenExpiredError as JWTTokenExpiredError,
  verify,
} from 'jsonwebtoken';

import {
  IEncryptProvider,
  IVerifyCriptographyProvider,
} from '@application/protocols/providers/cryptography/cryptography';

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
    data: IEncryptProvider.Input<any>
  ): Promise<IEncryptProvider.Output> {
    const { subject, payload } = data;

    return sign(payload, this.secret, {
      subject,
      expiresIn: this.expiresInSeconds,
    });
  }

  async verify<T = unknown>(
    data: IVerifyCriptographyProvider.Input
  ): Promise<IVerifyCriptographyProvider.Output<T>> {
    const { value } = data;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sub, aud, exp, iat, iss, jti, nbf, ...rest } = verify(
        value,
        this.secret
      ) as JwtPayload;

      return { subject: sub, payload: rest as T };
    } catch (error) {
      if (error instanceof JWTTokenExpiredError) {
        throw new AccessTokenExpiredError();
      }

      if (error instanceof JsonWebTokenError) {
        throw new InvalidAccessTokenError();
      }

      throw error;
    }
  }
}
