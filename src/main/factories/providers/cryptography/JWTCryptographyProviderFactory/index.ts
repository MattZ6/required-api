import { JWTCryptographyProvider } from '@infra/cryptography/cryptography/JWTCryptographyProvider';

export const makeJWTCryptographyProvider = () =>
  new JWTCryptographyProvider(process.env.AUTH_SECRET, '15m');
