import { BcryptjsHashProvider } from '@infra/criptography/hash/BcryptHashProvider';

export const makeBcryptjsHashProvider = () => new BcryptjsHashProvider(12);
