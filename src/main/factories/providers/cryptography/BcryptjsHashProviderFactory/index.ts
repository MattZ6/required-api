import { BcryptjsHashProvider } from '@infra/providers/cryptography/hash/BcryptjsHashProvider';

export const makeBcryptjsHashProvider = () => new BcryptjsHashProvider(12);
