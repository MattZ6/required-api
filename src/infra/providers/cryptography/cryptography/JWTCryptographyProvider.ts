import { sign } from 'jsonwebtoken';

import { IEncryptProvider } from '@data/protocols/providers/cryptography/cryptography/EncryptProvider';

export class JWTCryptographyProvider implements IEncryptProvider {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string | number
  ) {}

  async encrypt(value: string): Promise<string> {
    return sign({}, this.secret, {
      subject: value,
      expiresIn: this.expiresIn,
    });
  }
}
