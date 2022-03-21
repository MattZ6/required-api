import { IValidation } from '@presentation/protocols';

export * from './errors';

export class ValidationSpy implements IValidation {
  validate(_: any): void {
    // That's all folks
  }
}
