import Faker from 'faker';

import {
  PasswordNotMatchError,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';

import { AuthenticateUserController } from '@presentation/controllers/authentication/AuthenticateUserController';
import {
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http/http';

import { AuthenticateUserUseCaseSpy } from '../mocks';

let authenticateUserUseCaseSpy: AuthenticateUserUseCaseSpy;

let authenticateUserController: AuthenticateUserController;

describe('AuthenticateUserController', () => {
  beforeEach(() => {
    authenticateUserUseCaseSpy = new AuthenticateUserUseCaseSpy();

    authenticateUserController = new AuthenticateUserController(
      authenticateUserUseCaseSpy
    );
  });

  it('should call AuthenticateUserUseCase with correct data', async () => {
    const executeSpy = jest.spyOn(authenticateUserUseCaseSpy, 'execute');

    const email = Faker.internet.email();
    const password = Faker.internet.password();

    await authenticateUserController.handle({
      body: {
        email,
        password,
      },
    });

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      email,
      password,
    });
  });

  it('should throw if AuthenticateUserUseCase throws', async () => {
    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(new Error());

    const promise = authenticateUserController.handle({
      body: {
        email: Faker.internet.email(),
        password: Faker.internet.password(),
      },
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return 404 if AuthenticateUserUseCase throws UserNotFoundWithThisEmailError', async () => {
    const error = new UserNotFoundWithThisEmailError();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await authenticateUserController.handle({
      body: {
        email: Faker.internet.email(),
        password: Faker.internet.password(),
      },
    });

    expect(response).toEqual(notFound(error));
  });

  it('should return 422 if AuthenticateUserUseCase throws PasswordNotMatchError', async () => {
    const error = new PasswordNotMatchError();

    jest
      .spyOn(authenticateUserUseCaseSpy, 'execute')
      .mockRejectedValueOnce(error);

    const response = await authenticateUserController.handle({
      body: {
        email: Faker.internet.email(),
        password: Faker.internet.password(),
      },
    });

    expect(response).toEqual(unprocessableEntity(error));
  });

  it('should return 200 on success', async () => {
    const access_token = Faker.datatype.string();

    jest.spyOn(authenticateUserUseCaseSpy, 'execute').mockReturnValueOnce(
      Promise.resolve({
        access_token,
      })
    );

    const response = await authenticateUserController.handle({
      body: {
        email: Faker.internet.email(),
        password: Faker.internet.password(),
      },
    });

    expect(response).toEqual(ok({ access_token }));
  });
});
