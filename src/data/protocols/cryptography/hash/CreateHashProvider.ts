export interface ICreateHashProvider {
  hash(value: string): Promise<string>;
}
