import { BcryptjsHashProvider } from '@infra/cryptography/hash/BcryptjsHashProvider';

export const makeBcryptjsHashProvider = () => new BcryptjsHashProvider(12);
