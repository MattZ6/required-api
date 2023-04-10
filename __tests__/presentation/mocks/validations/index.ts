import { IValidation } from '@presentation/protocols'

export * from './errors'
export * from './validations'

export class ValidationSpy implements IValidation<any> {
  validate(_: any) {
    return null
  }
}
