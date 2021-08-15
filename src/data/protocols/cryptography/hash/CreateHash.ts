export interface ICreateHash {
  hash(value: string): Promise<string>;
}
