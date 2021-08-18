export interface IEncryptProvider {
  encrypt(value: string): Promise<string>;
}
