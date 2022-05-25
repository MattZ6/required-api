import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors';

import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';
import { badRequest, conflict, created } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  ValidationSpy,
  CreateUserUseCaseSpy,
  makeCreateAccountControllerRequestMock,
  makeValidationErrorMock,
} from '../../mocks';

let validation: ValidationSpy;
let createUserUseCaseSpy: CreateUserUseCaseSpy;

let createAccountController: CreateAccountController;

describe('CreateAccountController', () => {
  beforeEach(() => {
    validation = new ValidationSpy();
    createUserUseCaseSpy = new CreateUserUseCaseSpy();

    createAccountController = new CreateAccountController(
      validation,
      createUserUseCaseSpy
    );
  });

  it('should call Validation with correct values', async () => {
    const validateSpy = jest.spyOn(validation, 'validate');

    const request = makeCreateAccountControllerRequestMock();

    await createAccountController.handle(request);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(request.body);
  });

  it('should throw if Validation throws', async () => {
    const error = makeErrorMock();

    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      throw error;
    });

    const request = makeCreateAccountControllerRequestMock();

    const promise = createAccountController.handle(request);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should return bad request (400) if Validation throws ValidationError', async () => {
    const error = makeValidationErrorMock();

    jest.spyOn(validation, 'validate').mockReturnValueOnce(error);

    const request = makeCreateAccountControllerRequestMock();

    const response = await createAccountController.handle(request);

    expect(response).toEqual(badRequest(error));
  });

  it('should call CreateUserUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createUserUseCaseSpy, 'execute');

    const request = makeCreateAccountControllerRequestMock();

    await createAccountController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    });
  });

  it('should throw if CreateUserUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const request = makeCreateAccountControllerRequestMock();

    const promise = createAccountController.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if CreateUserUseCase throws UserAlreadyExistsWithProvidedEmailError', async () => {
    const error = new UserAlreadyExistsWithProvidedEmailError();

    jest.spyOn(createUserUseCaseSpy, 'execute').mockRejectedValueOnce(error);

    const request = makeCreateAccountControllerRequestMock();

    const response = await createAccountController.handle(request);

    expect(response).toEqual(conflict(error));
  });

  it('should return created (201) on success', async () => {
    const request = makeCreateAccountControllerRequestMock();

    const response = await createAccountController.handle(request);

    expect(response).toEqual(created());
  });
});
