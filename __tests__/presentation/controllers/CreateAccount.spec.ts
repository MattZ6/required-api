import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors';

import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';
import { created, conflict } from '@presentation/helpers/http';

import { makeErrorMock } from '../../domain';
import {
  CreateUserUseCaseSpy,
  makeCreateAccountControllerRequestMock,
} from '../mocks';

let createUserUseCaseSpy: CreateUserUseCaseSpy;

let createAccountController: CreateAccountController;

describe('CreateAccountController', () => {
  beforeEach(() => {
    createUserUseCaseSpy = new CreateUserUseCaseSpy();

    createAccountController = new CreateAccountController(createUserUseCaseSpy);
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
