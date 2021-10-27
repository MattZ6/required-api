import { JWTCriptographyProvider } from '@infra/criptography/criptography/JWTCriptographyProvider';

export const makeJWTCriptographyProvider = () =>
  new JWTCriptographyProvider(process.env.AUTH_SECRET, '15m');
