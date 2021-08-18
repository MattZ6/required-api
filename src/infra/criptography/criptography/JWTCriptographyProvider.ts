import { sign } from 'jsonwebtoken';

import { IEncryptProvider } from '@data/protocols/cryptography/criptography/EncryptProvider';

export class JWTCriptographyProvider implements IEncryptProvider {
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
