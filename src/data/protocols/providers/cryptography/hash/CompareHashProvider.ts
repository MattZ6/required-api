export interface ICompareHashProvider {
  compare(value: string, hashedValue: string): Promise<boolean>;
}
