import {
  WrongPasswordError,
  UserNotFoundWithProvidedEmailError,
} from '@domain/errors';

import { AuthenticateUserController } from '@presentation/controllers/user/AuthenticateUser';
import {
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http/http';

import { makeErrorMock } from '../../domain';
import {
  AuthenticateUserUseCaseSpy,
  makeAuthenticateUserUseCaseOutputMock,
} from '../mocks';
import { makeAuthenticateUserControllerRequestMock } from '../mocks/controllers';

let authenticateUserUseCaseSpy: AuthenticateUserUseCaseSpy;

let authenticateUserController: AuthenticateUserController;

describe('AuthenticateUserController', () => {
  beforeEach(() => {
    authenticateUserUseCaseSpy = new AuthenticateUserUseCaseSpy();

    authenticateUserController = new AuthenticateUserController(
      authenticateUserUseCaseSpy
    );
  });

  it('should call AuthenticateUserUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(authenticateUserUseCaseSpy, 'execute');

    const request = makeAuthenticateUserControllerRequestMock();

    await authenticateUserController.handle(request);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      email: request.body.email,
      password: request.body.password,
    });
  });

  it('should throw if AuthenticateUserUseCase throws', async () => {
    const error = makeErrorMock();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeAuthenticateUserControllerRequestMock();

    const promise = authenticateUserController.handle(request);

    await expect(promise).rejects.toThrowError(error);
  });

  it('should return 404 (no found) if AuthenticateUserUseCase throws UserNotFoundWithProvidedEmailError', async () => {
    const error = new UserNotFoundWithProvidedEmailError();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeAuthenticateUserControllerRequestMock();

    const response = await authenticateUserController.handle(request);

    expect(response).toEqual(notFound(error));
  });

  it('should return 422 (unprocessable entity) if AuthenticateUserUseCase throws WrongPasswordError', async () => {
    const error = new WrongPasswordError();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const request = makeAuthenticateUserControllerRequestMock();

    const response = await authenticateUserController.handle(request);

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return 200 (ok) with authentication data on success', async () => {
    const outputMock = makeAuthenticateUserUseCaseOutputMock();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const request = makeAuthenticateUserControllerRequestMock();

    const response = await authenticateUserController.handle(request);

    expect(response).toEqual(ok({ access_token: outputMock.access_token }));
  });
});
