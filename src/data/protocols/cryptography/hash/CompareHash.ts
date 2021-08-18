export interface ICompareHash {
  compare(value: string, hashedValue: string): Promise<boolean>;
}
