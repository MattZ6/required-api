import { BcryptjsHashProvider } from '@infra/cryptography/hash/BcryptHashProvider';

export const makeBcryptjsHashProvider = () => new BcryptjsHashProvider(12);
