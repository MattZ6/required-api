import { JWTCryptographyProvider } from '@infra/providers/cryptography/cryptography/JWTCryptographyProvider';

export const makeJWTCryptographyProvider = () =>
  new JWTCryptographyProvider(process.env.JWT_AUTH_SECRET, '15m');
