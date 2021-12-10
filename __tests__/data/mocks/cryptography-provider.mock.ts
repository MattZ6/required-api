import { IEncryptProvider } from '@data/protocols/cryptography/cryptography';
import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@data/protocols/cryptography/hash';

export class GenerateHashProviderSpy implements IGenerateHashProvider {
  async hash(value: string): Promise<string> {
    return value;
  }
}

export class CompareHashProviderSpy implements ICompareHashProvider {
  async compare(_: string, __: string): Promise<boolean> {
    return true;
  }
}

export class EncryptProviderSpy implements IEncryptProvider {
  async encrypt(value: string): Promise<string> {
    return value;
  }
}
