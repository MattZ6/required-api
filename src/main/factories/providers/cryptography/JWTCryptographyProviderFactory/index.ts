import { JWTCryptographyProvider } from '@infra/cryptography/cryptography/JWTCryptographyProvider';

export const makeJWTCryptographyProvider = () =>
  new JWTCryptographyProvider(process.env.JWT_AUTH_SECRET, '15m');
