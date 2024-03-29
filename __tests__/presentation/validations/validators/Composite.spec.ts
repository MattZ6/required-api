import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vitest } from 'vitest'

import {
  MinLengthFieldError,
  RequiredFieldError,
} from '@presentation/validations/errors'
import { ValidationComposite } from '@presentation/validations/validators'

import { ValidationSpy } from '../../mocks'

let validationsSpy: ValidationSpy[]

let validationComposite: ValidationComposite<{
  [key: string]: string
}>

describe('ValidationComposite', () => {
  beforeEach(() => {
    validationsSpy = [
      new ValidationSpy(),
      new ValidationSpy(),
      new ValidationSpy(),
    ]

    validationComposite = new ValidationComposite(validationsSpy)
  })

  it('should return an error if any validation fails', () => {
    const field = faker.database.column()

    const errorMock = new RequiredFieldError(field)

    vitest
      .spyOn(validationsSpy[validationsSpy.length - 1], 'validate')
      .mockReturnValueOnce(errorMock)

    const output = validationComposite.validate({
      [field]: faker.datatype.string(),
    })

    expect(output).toEqual(errorMock)
  })

  it('should return the first error if more then one validation fails', () => {
    const field = faker.database.column()

    const errorMock = new MinLengthFieldError(field, 3)

    vitest.spyOn(validationsSpy[0], 'validate').mockReturnValueOnce(errorMock)
    vitest
      .spyOn(validationsSpy[2], 'validate')
      .mockReturnValueOnce(new RequiredFieldError(field))

    const output = validationComposite.validate({
      [field]: faker.datatype.string(),
    })

    expect(output).toEqual(errorMock)
  })

  it('should return null if validation succeeds', () => {
    const field = faker.database.column()

    const output = validationComposite.validate({
      [field]: faker.datatype.string(),
    })

    expect(output).toBeNull()
  })
})
